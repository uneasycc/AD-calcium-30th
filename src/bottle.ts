// Bottle Animation Component - Shared across all stage transitions
import { playPop, playBubble } from './sound';

// Product image paths
export const PRODUCT_IMAGES = {
  'ad-220': '/images/ad-220.webp',
  'ad-450': '/images/ad-450.webp',
  'ad-strawberry-220': '/images/ad-strawberry-220.webp',
  'ad-peach-220': '/images/ad-peach-220.webp',
  'ad-strawberry-450': '/images/ad-strawberry-450.webp',
  'ad-peach-450': '/images/ad-peach-450.webp',
  'ad-lactic-450': '/images/ad-lactic-450.webp',
  'ad-collagen-450': '/images/ad-collagen-450.webp',
} as const;

export type ProductImageKey = keyof typeof PRODUCT_IMAGES;

// Flavor display names
export const FLAVOR_NAMES: Record<string, string> = {
  'ad-220': '经典AD钙奶 220ml',
  'ad-450': '经典AD钙奶 450ml',
  'ad-strawberry-220': '草莓味AD钙奶 220ml',
  'ad-peach-220': '蜜桃味AD钙奶 220ml',
  'ad-strawberry-450': '草莓味AD钙奶 450ml',
  'ad-peach-450': '蜜桃味AD钙奶 450ml',
  'ad-lactic-450': '乳酸菌AD钙奶 450ml',
  'ad-collagen-450': '胶原蛋白AD钙奶 450ml',
};

// Get a random product image key
export function getRandomProductKey(): ProductImageKey {
  const keys = Object.keys(PRODUCT_IMAGES) as ProductImageKey[];
  return keys[Math.floor(Math.random() * keys.length)];
}

// ========== Create Background Bubbles ==========
export function createBubbleBackground(container: HTMLElement): void {
  const bubbleBg = document.createElement('div');
  bubbleBg.className = 'bubble-bg';
  bubbleBg.id = 'bubble-bg';

  // Create floating bubbles
  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 8 + Math.random() * 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.setProperty('--duration', `${4 + Math.random() * 5}s`);
    bubble.style.setProperty('--opacity', `${0.15 + Math.random() * 0.25}`);
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    bubbleBg.appendChild(bubble);
  }

  // Create twinkling stars
  for (let i = 0; i < 10; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
    star.style.animationDelay = `${Math.random() * 3}s`;
    bubbleBg.appendChild(star);
  }

  container.appendChild(bubbleBg);
}

// ========== Create Bottle Image HTML ==========
export function createBottleImage(
  productKey: ProductImageKey = 'ad-450',
  options: {
    width?: number;
    className?: string;
    id?: string;
    style?: string;
    clickable?: boolean;
    showCap?: boolean;
  } = {}
): string {
  const { width = 120, className = '', id = '', style = '', clickable = false, showCap = true } = options;

  const imgSrc = PRODUCT_IMAGES[productKey];
  const cursorStyle = clickable ? 'cursor:pointer;' : '';
  const idAttr = id ? `id="${id}"` : '';

  return `
    <div class="bottle-img-wrapper ${className}" ${idAttr} style="position:relative; display:inline-block; ${cursorStyle} ${style}">
      ${showCap ? `
      <div class="bottle-cap-img" style="
        position:absolute; top:-8px; left:50%; transform:translateX(-50%);
        width:${Math.round(width * 0.35)}px; height:${Math.round(width * 0.18)}px;
        background:linear-gradient(135deg, #FF9800, #F57C00);
        border-radius:4px 4px 2px 2px; z-index:2;
        box-shadow:0 2px 4px rgba(0,0,0,0.15);
      ">
        <div style="position:absolute; top:3px; left:2px; right:2px; height:2px; background:rgba(255,255,255,0.3); border-radius:1px;"></div>
        <div style="position:absolute; top:7px; left:2px; right:2px; height:2px; background:rgba(255,255,255,0.3); border-radius:1px;"></div>
      </div>
      ` : ''}
      <img
        src="${imgSrc}"
        alt="${FLAVOR_NAMES[productKey]}"
        width="${width}"
        style="display:block; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.2));"
        draggable="false"
      />
    </div>
  `;
}

// ========== Bottle Opening Animation ==========
export function showBottleOpening(container: HTMLElement, onComplete: () => void): void {
  playPop();
  setTimeout(() => playBubble(), 100);
  setTimeout(() => playBubble(), 200);
  setTimeout(() => playBubble(), 300);

  const productKey = getRandomProductKey();

  const overlay = document.createElement('div');
  overlay.className = 'bottle-opening-overlay';
  overlay.innerHTML = `
    <div class="bottle-anim" style="position:relative;">
      ${createBottleImage(productKey, { width: 140, showCap: true })}
      <div class="bottle-bubbles-burst" id="bottle-burst"></div>
    </div>
    <div style="margin-top:20px; font-size:16px; color:var(--ad-green-dark); font-weight:700; animation:feedback-pop 0.6s 0.3s both;">
      啵～ ✨
    </div>
  `;

  container.appendChild(overlay);

  // Animate cap popping
  setTimeout(() => {
    const cap = overlay.querySelector('.bottle-cap-img');
    if (cap) cap.classList.add('bottle-cap-pop');

    // Burst bubbles
    const burstContainer = overlay.querySelector('#bottle-burst');
    if (burstContainer) {
      for (let i = 0; i < 12; i++) {
        const b = document.createElement('div');
        b.className = 'burst-bubble';
        const size = 6 + Math.random() * 14;
        b.style.width = `${size}px`;
        b.style.height = `${size}px`;
        const angle = (Math.PI * 2 * i) / 12;
        const dist = 30 + Math.random() * 50;
        b.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        b.style.setProperty('--ty', `${Math.sin(angle) * dist - 40}px`);
        b.style.setProperty('--dur', `${0.4 + Math.random() * 0.3}s`);
        burstContainer.appendChild(b);
      }
    }
  }, 200);

  // Remove overlay and continue
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    setTimeout(() => {
      overlay.remove();
      onComplete();
    }, 300);
  }, 1200);
}

// ========== Create Desk Scene Bottle (for intro) ==========
export function createDeskSceneBottle(onClick: () => void): string {
  return `
    <div class="desk-scene">
      <div class="desk-surface"></div>
      <div class="bottle-container" id="intro-bottle" style="position:relative; bottom:20px; z-index:2;">
        ${createBottleImage('ad-450', { width: 130, clickable: true, showCap: true })}
        <div style="
          position:absolute; bottom:-8px; left:50%; transform:translateX(-50%);
          background:rgba(0,0,0,0.1); border-radius:50%; width:80px; height:12px;
          filter:blur(3px);
        "></div>
      </div>
      <div style="
        position:absolute; top:40px; left:50%; transform:translateX(-50%);
        background:white; padding:8px 16px; border-radius:20px;
        font-size:13px; color:var(--ad-green-dark); font-weight:600;
        box-shadow:0 2px 10px var(--ad-shadow); white-space:nowrap;
        animation:float-gentle 2s ease-in-out infinite;
      ">
        点击瓶盖打开 👆
      </div>
    </div>
  `;
}

// ========== Create Product Gallery HTML ==========
export function createProductGallery(selectedKey: ProductImageKey = 'ad-450'): string {
  const allProducts = Object.entries(PRODUCT_IMAGES) as [ProductImageKey, string][];
  return `
    <div class="product-gallery" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; padding:12px 0;">
      ${allProducts.map(([key, _src]) => `
        <div class="product-thumb ${key === selectedKey ? 'active' : ''}" data-product="${key}" style="
          width:60px; height:80px; border-radius:8px; overflow:hidden;
          border:2px solid ${key === selectedKey ? 'var(--ad-orange)' : 'transparent'};
          cursor:pointer; transition:all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          background:rgba(255,255,255,0.5);
        ">
          <img src="${PRODUCT_IMAGES[key]}" alt="${FLAVOR_NAMES[key]}" style="width:100%; height:100%; object-fit:contain;" />
        </div>
      `).join('')}
    </div>
  `;
}
