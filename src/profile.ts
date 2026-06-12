// Stage 3: Happy Profile Generation
import type { GameState, StageTransition } from './types';
import { playClick, playSuccess, playPop } from './sound';
import { createBottleImage, PRODUCT_IMAGES, type ProductImageKey } from './bottle';

// ========== Personality Tags ==========
const personalityTags = [
  '酸甜派·行动派', '可可爱爱·闷骚型', '元气满满·社交牛',
  '温柔系·佛系派', '热血派·冒险型', '佛系青年·快乐本乐',
  '调皮鬼·机智型', '暖心宝·治愈系',
];

const blessings = [
  '不管几岁，快乐万岁！愿你永远保持那颗爱笑的童心，像第一口AD钙奶一样甜！',
  '30年的陪伴，30年的快乐。愿你的每一天都像打开一瓶新AD钙奶，充满期待！',
  '时光可以改变很多事，但改变不了你嘴角上扬的弧度。快乐万岁，永远年轻！',
  '从1996到2026，快乐从未缺席。愿接下来的每一天，都有AD钙奶般的甜蜜！',
  '快乐不分年龄，童心不设期限。30周年快乐，愿你的笑容比阳光还灿烂！',
];

// Product image mapping by personality
const personalityProducts: Record<number, ProductImageKey> = {
  0: 'ad-strawberry-220',  // 酸甜派 → 草莓
  1: 'ad-peach-220',       // 可可爱爱 → 蜜桃
  2: 'ad-lactic-450',      // 元气满满 → 乳酸菌
  3: 'ad-450',             // 温柔系 → 经典
  4: 'ad-collagen-450',    // 热血派 → 胶原蛋白
  5: 'ad-220',             // 佛系 → 经典小瓶
  6: 'ad-strawberry-450',  // 调皮鬼 → 草莓大瓶
  7: 'ad-peach-450',       // 暖心宝 → 蜜桃大瓶
};

export function generateProfileData(state: Partial<GameState>): {
  personalityTag: string;
  blessing: string;
  productKey: ProductImageKey;
} {
  const answers = state.quizAnswers || [];
  const score = state.challengeScore || 0;

  let cCount = 0;
  answers.forEach((a) => { if (a === 2) cCount++; });

  let tagIndex = 0;
  if (cCount >= 3 && score >= 7) tagIndex = 0;
  else if (cCount >= 3 && score < 7) tagIndex = 1;
  else if (cCount >= 2 && score >= 7) tagIndex = 2;
  else if (cCount >= 2 && score < 4) tagIndex = 3;
  else if (score >= 9) tagIndex = 4;
  else if (score < 3) tagIndex = 5;
  else if (cCount >= 1) tagIndex = 6;
  else tagIndex = 7;

  const blessingIndex = (answers.reduce((s, a) => s + a, 0) + score) % blessings.length;

  return {
    personalityTag: personalityTags[tagIndex],
    blessing: blessings[blessingIndex],
    productKey: personalityProducts[tagIndex],
  };
}

// ========== Render Profile ==========
export function renderProfile(
  container: HTMLElement,
  state: GameState,
  onEasterEgg: StageTransition
): void {
  playSuccess();

  const profile = generateProfileData(state);

  container.innerHTML = `
    <div class="page" style="justify-content: center; padding-top: calc(10px + var(--ad-safe-top));">
      <div style="font-size:14px; color:var(--ad-text-light); margin-bottom:16px;">— 我的快乐档案 —</div>
      <div class="profile-card" id="profile-card">
        <!-- Pixel decorations -->
        <div class="pixel-deco top-left"></div>
        <div class="pixel-deco top-right"></div>
        <div class="pixel-deco bottom-left"></div>
        <div class="pixel-deco bottom-right"></div>

        <!-- Product Image -->
        <div style="display:flex; justify-content:center; margin-bottom:8px;">
          <img
            src="${PRODUCT_IMAGES[profile.productKey]}"
            alt="AD钙奶"
            width="80"
            style="filter:drop-shadow(0 2px 8px rgba(76,175,80,0.2));"
            crossorigin="anonymous"
          />
        </div>

        <!-- Happy Age -->
        <div style="text-align:center; margin-bottom:12px;">
          <div style="font-size:13px; color:var(--ad-text-light);">快乐年龄</div>
          <div style="font-size:36px; font-weight:900; color:var(--ad-green); line-height:1.1;">
            ${state.happyAge}<span style="font-size:16px;">岁</span>
          </div>
          <div style="font-size:14px; color:var(--ad-orange); font-weight:700;">${state.happyLabel}</div>
        </div>

        <!-- Fields -->
        <div class="profile-field">
          <div class="profile-field-label">🎮 快乐等级</div>
          <div class="profile-field-value">${state.challengeRating}</div>
        </div>
        <div class="profile-field">
          <div class="profile-field-label">💫 快乐人格</div>
          <div class="profile-field-value">${profile.personalityTag}</div>
        </div>

        <!-- Blessing -->
        <div class="profile-blessing">
          "${profile.blessing}"
        </div>

        <!-- Footer -->
        <div class="profile-footer">
          AD钙奶30周年<br>不管几岁 快乐万岁
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="margin-top:24px; width:100%; max-width:340px;">
        <button class="btn-primary w-full" id="btn-save" style="margin-bottom:12px;">
          📸 保存快乐档案
        </button>
        <div class="share-buttons">
          <button class="share-btn wechat" id="btn-wechat">💬 微信</button>
          <button class="share-btn weibo" id="btn-weibo">📢 微博</button>
          <button class="share-btn save" id="btn-save-img">💾 保存图片</button>
        </div>
      </div>

      <!-- Hidden Easter Egg Link -->
      <div style="margin-top:24px; text-align:center;">
        <button id="btn-easter-egg" style="background:none; border:none; font-size:12px; color:var(--ad-green-light); cursor:pointer; padding:8px 16px;">
          🎁 分享后解锁30周年经典回忆
        </button>
      </div>
    </div>
  `;

  // Save image button
  container.querySelector('#btn-save')?.addEventListener('click', () => {
    playClick();
    saveProfileImage();
  });

  container.querySelector('#btn-save-img')?.addEventListener('click', () => {
    playClick();
    saveProfileImage();
  });

  // Share buttons
  container.querySelector('#btn-wechat')?.addEventListener('click', () => {
    playClick();
    shareToWechat();
  });

  container.querySelector('#btn-weibo')?.addEventListener('click', () => {
    playClick();
    shareToWeibo();
  });

  // Easter egg
  container.querySelector('#btn-easter-egg')?.addEventListener('click', () => {
    playPop();
    onEasterEgg('easter-egg', {
      personalityTag: profile.personalityTag,
      blessing: profile.blessing,
    });
  });
}

// ========== Save Profile Image ==========
async function saveProfileImage(): Promise<void> {
  const cardEl = document.getElementById('profile-card');
  if (!cardEl) return;

  try {
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(cardEl, {
      backgroundColor: '#FFF8E1',
      scale: 2,
      useCORS: true,
      logging: false,
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'AD钙奶30周年-快乐档案.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  } catch (err) {
    console.error('Save image failed:', err);
    showShareTip('长按档案卡图片可保存到相册');
  }
}

// ========== Share Functions ==========
function shareToWechat(): void {
  if (navigator.share) {
    navigator.share({
      title: 'AD钙奶30周年 · 不管几岁 快乐万岁',
      text: '我测出了我的快乐年龄，你也来试试！',
      url: window.location.href,
    }).catch(() => {
      showShareTip('请截图分享到微信朋友圈');
    });
  } else {
    showShareTip('请截图分享到微信朋友圈');
  }
}

function shareToWeibo(): void {
  const text = encodeURIComponent('AD钙奶30周年 · 不管几岁 快乐万岁！我测出了我的快乐年龄，你也来试试！');
  const url = encodeURIComponent(window.location.href);
  window.open(`https://service.weibo.com/share/share.php?title=${text}&url=${url}`, '_blank');
}

function showShareTip(message: string): void {
  const tip = document.createElement('div');
  tip.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.75); color: white; padding: 16px 24px;
    border-radius: 12px; font-size: 14px; z-index: 200;
    animation: overlay-in 0.3s ease-out;
  `;
  tip.textContent = message;
  document.body.appendChild(tip);
  setTimeout(() => tip.remove(), 2500);
}

// ========== Easter Egg: Classic Ad Gallery ==========
export function renderEasterEgg(container: HTMLElement, onBack: () => void): void {
  playPop();

  const classicAds = [
    { year: '1996', slogan: 'AD钙奶 最初的快乐', flavor: 'ad-220' as ProductImageKey, bg: '#E8F5E9' },
    { year: '2000', slogan: '酸酸甜甜就是我', flavor: 'ad-450' as ProductImageKey, bg: '#FFF8E1' },
    { year: '2005', slogan: '喝AD钙奶 做快乐宝贝', flavor: 'ad-strawberry-220' as ProductImageKey, bg: '#FFEBEE' },
    { year: '2010', slogan: 'AD钙奶 陪伴成长每一天', flavor: 'ad-peach-220' as ProductImageKey, bg: '#FFF3E0' },
    { year: '2018', slogan: '新口味 新快乐', flavor: 'ad-lactic-450' as ProductImageKey, bg: '#E3F2FD' },
    { year: '2026', slogan: '不管几岁 快乐万岁', flavor: 'ad-collagen-450' as ProductImageKey, bg: '#E8F5E9' },
  ];

  container.innerHTML = `
    <div class="page">
      <div style="font-size:14px; color:var(--ad-text-light); margin-bottom:16px;">🎁 30周年经典回忆</div>
      <div class="title-main" style="font-size:22px; margin-bottom:20px;">AD钙奶 · 30年快乐回忆</div>
      <div class="easter-egg-page" style="overflow-y:auto; max-height:70vh; padding-bottom:80px;">
        ${classicAds.map((ad, i) => `
          <div class="ad-frame" style="background:${ad.bg}; animation-delay:${i * 0.2}s;">
            <div class="ad-year">${ad.year}</div>
            <div class="ad-slogan">${ad.slogan}</div>
            <div style="display:flex; justify-content:center; margin:8px 0;">
              <img src="${PRODUCT_IMAGES[ad.flavor]}" alt="AD钙奶${ad.year}" width="50" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />
            </div>
            <div style="position:absolute; bottom:8px; right:12px; font-size:11px; color:rgba(0,0,0,0.2); font-weight:700;">
              AD钙奶® ${ad.year}
            </div>
          </div>
        `).join('')}
      </div>
      <div style="position:fixed; bottom: calc(20px + var(--ad-safe-bottom)); left:50%; transform:translateX(-50%); z-index:10;">
        <button class="btn-secondary" id="btn-back-profile">
          ← 返回快乐档案
        </button>
      </div>
    </div>
  `;

  container.querySelector('#btn-back-profile')?.addEventListener('click', () => {
    playClick();
    onBack();
  });
}
