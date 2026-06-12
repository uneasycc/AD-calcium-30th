// Stage 2: 30-Second Happy Challenge
import type { MiniGame, VisualStyle, StageTransition } from './types';
import {
  playClick, playMiniSuccess, playMiniFail, playCountdown,
  playTick, playSuccess, playPop
} from './sound';

// ========== Mini Games Definition ==========
// Every game is tightly themed around AD Calcium Milk brand
const allMiniGames: MiniGame[] = [
  {
    id: 1,
    title: '拧开瓶盖',
    instruction: '点击瓶盖把它拧开！',
    gesture: 'tap',
    icon: '🧴',
    failText: '瓶盖太紧没拧开，再试试！',
  },
  {
    id: 2,
    title: '插入吸管',
    instruction: '向下滑动插入吸管！',
    gesture: 'swipe-down',
    icon: '🥤',
    failText: '吸管插歪了，奶都漏了',
  },
  {
    id: 3,
    title: '喝第一口奶',
    instruction: '长按吸管品尝第一口！',
    gesture: 'long-press',
    icon: '🥛',
    failText: '还没喝到就洒了',
  },
  {
    id: 4,
    title: '摇一摇钙奶',
    instruction: '上下快速摇匀钙奶！',
    gesture: 'shake-ud',
    icon: '🫧',
    failText: '没摇匀，味道分层了',
  },
  {
    id: 5,
    title: '收集30颗钙星',
    instruction: '连续点击收集30周年钙星！',
    gesture: 'multi-tap',
    icon: '⭐',
    failText: '钙星不够，能量不足',
  },
  {
    id: 6,
    title: '接住掉落的AD钙奶',
    instruction: '左右滑动接住掉落的钙奶！',
    gesture: 'swipe-lr',
    icon: '🫳',
    failText: 'AD钙奶掉地上啦！',
  },
  {
    id: 7,
    title: '撕开30周年标签',
    instruction: '快速来回滑动撕开标签！',
    gesture: 'rapid-swipe',
    icon: '🏷️',
    failText: '标签撕坏了，再试一瓶',
  },
  {
    id: 8,
    title: '吹灭30周年蜡烛',
    instruction: '长按吹灭AD钙奶30岁蜡烛！',
    gesture: 'long-press',
    icon: '🎂',
    failText: '蜡烛又亮了，许个愿再吹',
  },
  {
    id: 9,
    title: '拼出AD钙奶30年',
    instruction: '把logo拖到正确位置！',
    gesture: 'drag',
    icon: '🧩',
    failText: '拼图散落一地，重新来过',
  },
  {
    id: 10,
    title: '找到隐藏的AD钙奶',
    instruction: '找到藏在画面里的AD钙奶！',
    gesture: 'find-tap',
    icon: '🔍',
    failText: '找错位置了，AD钙奶藏得深',
  },
];

const visualStyles: VisualStyle[] = ['pixel', 'handdrawn', '3d', 'comic', 'neon'];
const styleLabels: Record<VisualStyle, string> = {
  pixel: '像素风 · 1994',
  handdrawn: '手绘风 · 2004',
  '3d': '3D风 · 2014',
  comic: '漫画风 · 2020',
  neon: '霓虹风 · 2024',
};

// Product images for visual variety
const productImages = [
  '/images/ad-220.webp',
  '/images/ad-strawberry-220.webp',
  '/images/ad-peach-220.webp',
];

// ========== Challenge State ==========
let challengeScore = 0;
let currentGameIndex = 0;
let gameResults: boolean[] = [];
let selectedGames: MiniGame[] = [];
let gameTimer: ReturnType<typeof setTimeout> | null = null;
let gameTimeout: ReturnType<typeof setTimeout> | null = null;
let touchState: { startTime: number; startX: number; startY: number; tapCount: number; lastTapTime: number; swipeCount: number; lastSwipeDir: string; isDragging: boolean; dragStartX: number; dragStartY: number } = {
  startTime: 0, startX: 0, startY: 0, tapCount: 0, lastTapTime: 0, swipeCount: 0, lastSwipeDir: '', isDragging: false, dragStartX: 0, dragStartY: 0,
};

// ========== Render Challenge Intro ==========
export function renderChallengeIntro(container: HTMLElement, onStart: () => void): void {
  playPop();

  container.innerHTML = `
    <div class="page" style="justify-content: center;">
      <div style="font-size:64px; margin-bottom:16px;">🎉</div>
      <div class="title-main" style="margin-bottom:12px;">30秒快乐闯关</div>
      <div class="title-sub" style="margin-bottom:8px; max-width:280px;">
        AD钙奶30周年特别挑战！<br>
        30秒完成10个快闪互动<br>
        每一个都和AD钙奶有关！
      </div>
      <div style="margin:16px 0; display:flex; gap:8px; justify-content:center; align-items:center;">
        <img src="/images/ad-220.webp" alt="AD钙奶" style="height:80px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" />
        <img src="/images/ad-strawberry-220.webp" alt="草莓味" style="height:80px; filter:drop-shadow(0 4px 12px rgba(244,67,54,0.3));" />
        <img src="/images/ad-peach-220.webp" alt="蜜桃味" style="height:80px; filter:drop-shadow(0 4px 12px rgba(255,152,0,0.3));" />
      </div>
      <div style="margin:8px auto; max-width:300px; font-size:13px; color:var(--ad-text-light); line-height:1.8; text-align:left;">
        <div>🧴 拧瓶盖 · 插吸管 · 喝第一口</div>
        <div>🫧 摇钙奶 · 收集钙星 · 接住钙奶</div>
        <div>🏷️ 撕标签 · 吹蜡烛 · 拼logo · 找钙奶</div>
      </div>
      <button class="btn-primary btn-orange" id="btn-start-challenge" style="margin-top:16px;">
        开始挑战！
      </button>
    </div>
  `;

  container.querySelector('#btn-start-challenge')?.addEventListener('click', () => {
    playClick();
    onStart();
  });
}

// ========== Render Challenge (Main Loop) ==========
export function renderChallenge(container: HTMLElement, onComplete: (score: number, results: boolean[]) => void): void {
  challengeScore = 0;
  currentGameIndex = 0;
  gameResults = [];
  selectedGames = [...allMiniGames]; // Keep order - they tell a story

  // Show 3-2-1 countdown first
  showCountdown(container, () => {
    runNextGame(container, onComplete);
  });
}

function showCountdown(container: HTMLElement, onDone: () => void): void {
  let count = 3;

  function showNumber(): void {
    if (count <= 0) {
      onDone();
      return;
    }

    playCountdown(count === 1);

    container.innerHTML = `
      <div class="challenge-countdown">
        <div class="countdown-number flip-number">${count}</div>
      </div>
    `;

    count--;
    setTimeout(showNumber, 800);
  }

  showNumber();
}

function getVisualStyle(index: number): VisualStyle {
  return visualStyles[Math.floor(index / 2) % visualStyles.length];
}

function runNextGame(container: HTMLElement, onComplete: (score: number, results: boolean[]) => void): void {
  if (currentGameIndex >= 10) {
    // Challenge complete
    onComplete(challengeScore, gameResults);
    return;
  }

  const game = selectedGames[currentGameIndex];
  const style = getVisualStyle(currentGameIndex);

  renderGameUI(container, game, style);

  // Start 3-second timer for this game
  let timeLeft = 3000;
  const timerInterval = setInterval(() => {
    timeLeft -= 50;
    const bar = container.querySelector('.challenge-timer-bar') as HTMLElement;
    if (bar) {
      const pct = (timeLeft / 3000) * 100;
      bar.style.width = `${pct}%`;
      if (pct < 30) bar.classList.add('urgent');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleGameFail(container, game, onComplete);
    }
  }, 50);

  gameTimer = timerInterval;
  gameTimeout = setTimeout(() => {
    // Backup timeout
  }, 3500);

  // Setup gesture handler
  setupGesture(container, game, () => {
    // Success!
    clearInterval(timerInterval);
    if (gameTimeout) clearTimeout(gameTimeout);
    challengeScore++;
    gameResults.push(true);
    playMiniSuccess();
    showGameFeedback(container, true, game);

    setTimeout(() => {
      currentGameIndex++;
      runNextGame(container, onComplete);
    }, 600);
  }, () => {
    // Fail (timeout)
    clearInterval(timerInterval);
    if (gameTimeout) clearTimeout(gameTimeout);
    gameResults.push(false);
    playMiniFail();
    showGameFeedback(container, false, game);

    setTimeout(() => {
      currentGameIndex++;
      runNextGame(container, onComplete);
    }, 800);
  });
}

function renderGameUI(container: HTMLElement, game: MiniGame, style: VisualStyle): void {
  const styleClass = `style-${style}`;
  const dots = Array.from({ length: 10 }, (_, i) => {
    let cls = 'challenge-dot';
    if (i < currentGameIndex) cls += gameResults[i] ? ' success' : ' fail';
    if (i === currentGameIndex) cls += ' current';
    return `<div class="${cls}"></div>`;
  }).join('');

  container.innerHTML = `
    <div class="page ${styleClass}">
      <div class="challenge-score-display">
        <span>得分</span>
        <span style="color:var(--ad-orange); font-size:24px;">${challengeScore}</span>
        <span>/ 10</span>
      </div>
      <div class="challenge-dots">${dots}</div>
      <div style="font-size:11px; color:var(--ad-text-light); margin-bottom:8px;">
        ${styleLabels[style]}
      </div>
      <div class="challenge-timer">
        <div class="challenge-timer-bar" style="width:100%"></div>
      </div>
      <div class="challenge-game-area" id="game-area">
        <div class="challenge-instruction">${game.instruction}</div>
        <div id="game-content">
          ${renderGameContent(game, style)}
        </div>
      </div>
    </div>
  `;
}

function renderGameContent(game: MiniGame, _style: VisualStyle): string {
  switch (game.gesture) {
    case 'tap':
      // 拧开瓶盖 - click the bottle cap
      return `
        <div class="mini-game-tap-area" id="tap-target" style="position:relative;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:90px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" />
          <div style="position:absolute; top:-8px; left:50%; transform:translateX(-50%); font-size:24px; animation:bounce 0.6s infinite;">🔄</div>
        </div>
        <div style="margin-top:12px; font-size:13px; color:var(--ad-green); font-weight:600;">点击瓶盖拧开！</div>
      `;
    case 'swipe-down':
      // 插入吸管 - swipe down to insert straw
      return `
        <div style="position:relative; display:inline-block;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:80px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" />
          <div style="position:absolute; top:-30px; left:50%; transform:translateX(-50%); font-size:28px; animation:float-down 0.8s infinite;">🥤</div>
        </div>
        <div class="swipe-arrow down" style="font-size:36px; margin-top:12px;">⬇️</div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600;">向下滑动插入吸管</div>
      `;
    case 'long-press':
      if (game.id === 8) {
        // 吹灭30周年蜡烛 - birthday cake with AD bottle
        return `
          <div class="long-press-ring" id="long-press-target">
            <svg class="progress-ring" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="67" />
            </svg>
            <span style="position:relative; z-index:1; font-size:40px;">🎂</span>
          </div>
          <div style="margin-top:8px; font-size:12px; color:var(--ad-orange);">AD钙奶30岁啦！按住吹蜡烛</div>
        `;
      }
      // 喝第一口奶 - long press to drink
      return `
        <div class="long-press-ring" id="long-press-target">
          <svg class="progress-ring" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="67" />
          </svg>
          <span style="position:relative; z-index:1;">
            <img src="/images/ad-220.webp" alt="AD钙奶" style="height:48px;" />
          </span>
        </div>
        <div style="margin-top:8px; font-size:13px; color:var(--ad-green); font-weight:600;">按住吸管喝第一口！</div>
      `;
    case 'shake-ud':
      // 摇一摇钙奶 - shake up and down
      return `
        <div style="position:relative; display:inline-block;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:80px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" id="shake-bottle" />
          <div style="position:absolute; top:50%; left:-30px; font-size:20px; animation:shake-left 0.5s infinite;">⬆️</div>
          <div style="position:absolute; bottom:0; left:-30px; font-size:20px; animation:shake-right 0.5s infinite 0.25s;">⬇️</div>
        </div>
        <div style="display:flex; gap:6px; margin-top:12px; justify-content:center;" id="shake-dots">
          ${[0,1,2,3].map(() => '<div style="width:12px; height:12px; border-radius:50%; background:rgba(76,175,80,0.2); transition:background 0.2s;"></div>').join('')}
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600; margin-top:8px;">上下快速滑动摇匀！</div>
      `;
    case 'multi-tap':
      // 收集30颗钙星 - collect stars for 30th anniversary
      return `
        <div class="mini-game-tap-area" id="multi-tap-target" style="width:120px; height:120px; font-size:44px; background:radial-gradient(circle, rgba(255,249,196,0.5) 0%, transparent 70%);">
          ⭐
        </div>
        <div style="font-size:11px; color:var(--ad-orange); margin-top:4px;">30周年限定钙星</div>
        <div class="multi-tap-counter" id="tap-counter">
          ${[0,1,2,3,4].map(() => '<div class="multi-tap-dot"></div>').join('')}
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600; margin-top:4px;">连点5次收集钙星！</div>
      `;
    case 'swipe-lr':
      // 接住掉落的AD钙奶 - catch falling bottles
      return `
        <div style="position:relative; width:200px; height:120px; margin:0 auto;">
          <div style="position:absolute; top:0; left:50%; transform:translateX(-50%); font-size:28px; animation:fall-down 1.5s infinite;">
            <img src="/images/ad-220.webp" alt="AD钙奶" style="height:36px;" />
          </div>
          <div style="position:absolute; bottom:0; left:50%; transform:translateX(-50%); font-size:24px;">🧺</div>
        </div>
        <div style="display:flex; align-items:center; gap:16px; margin-top:8px; justify-content:center;">
          <span style="font-size:28px;">👈</span>
          <span style="font-size:28px;">👉</span>
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600;">左右滑动接住AD钙奶！</div>
      `;
    case 'rapid-swipe':
      // 撕开30周年标签 - tear off the label
      return `
        <div style="position:relative; display:inline-block;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:80px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" />
          <div style="position:absolute; top:30%; right:-20px; font-size:20px; animation:wiggle 0.4s infinite;">🏷️</div>
        </div>
        <div style="display:flex; gap:6px; margin-top:12px; justify-content:center;" id="energy-bars">
          ${[0,1,2].map(() => '<div style="width:50px; height:8px; background:rgba(76,175,80,0.2); border-radius:4px; overflow:hidden;"><div style="width:0%; height:100%; background:var(--ad-green); border-radius:4px; transition:width 0.2s;"></div></div>').join('')}
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600; margin-top:8px;">来回滑动撕开标签！</div>
      `;
    case 'drag':
      // 拼出AD钙奶30年 - drag logo to position
      return `
        <div style="display:flex; align-items:center; gap:20px; margin:16px 0;">
          <div class="drag-target" style="border:2px dashed var(--ad-green); border-radius:12px; padding:8px 16px; font-size:14px; color:var(--ad-green); font-weight:600;">
            AD钙奶<br><span style="font-size:20px;">30年</span>
          </div>
          <div class="drag-item" id="drag-item" style="cursor:grab; font-size:28px;">
            <img src="/images/ad-220.webp" alt="AD钙奶" style="height:40px;" />
          </div>
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600;">拖动AD钙奶logo到虚线框！</div>
      `;
    case 'find-tap':
      // 找到隐藏的AD钙奶
      return `
        <div class="find-area" id="find-area">
          ${generateFindArea()}
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600; margin-top:8px;">找到隐藏的AD钙奶！</div>
      `;
    default:
      return `<div style="font-size:48px;">${game.icon}</div>`;
  }
}

function generateFindArea(): string {
  const bottles = [
    '/images/ad-220.webp',
    '/images/ad-strawberry-220.webp',
    '/images/ad-peach-220.webp',
  ];
  const hiddenBottle = bottles[Math.floor(Math.random() * bottles.length)];
  // Theme-related decoys: childhood items around AD calcium milk
  const decoys = ['🎒', '📐', '✏️', '📚', '🎒', '🧸'];
  const items = decoys.map((emoji, i) => ({
    emoji,
    x: 15 + (i % 3) * 30,
    y: 20 + Math.floor(i / 3) * 35,
    isTarget: false,
  }));
  const targetX = 25 + Math.random() * 50;
  const targetY = 25 + Math.random() * 50;

  return items.map((item) => `
    <div class="find-decoy" style="left:${item.x}%; top:${item.y}%;">${item.emoji}</div>
  `).join('') + `
    <div class="find-hidden-item" style="left:${targetX}%; top:${targetY}%;" data-target="true">
      <img src="${hiddenBottle}" alt="AD钙奶" style="height:32px;" />
    </div>
  `;
}

// ========== Gesture Handling ==========
let gameCompleted = false;
let longPressTimer: ReturnType<typeof setTimeout> | null = null;
let longPressStart = 0;

function setupGesture(
  container: HTMLElement,
  game: MiniGame,
  onSuccess: () => void,
  onFail: () => void,
): void {
  gameCompleted = false;
  touchState = { startTime: 0, startX: 0, startY: 0, tapCount: 0, lastTapTime: 0, swipeCount: 0, lastSwipeDir: '', isDragging: false, dragStartX: 0, dragStartY: 0 };

  const gameArea = container.querySelector('#game-area') as HTMLElement;
  if (!gameArea) return;

  // TAP gesture - 拧开瓶盖
  if (game.gesture === 'tap') {
    const tapTarget = container.querySelector('#tap-target');
    if (tapTarget) {
      tapTarget.addEventListener('click', () => {
        if (gameCompleted) return;
        gameCompleted = true;
        tapTarget.classList.add('tapped');
        onSuccess();
      });
    }
  }

  // SWIPE DOWN gesture - 插入吸管
  if (game.gesture === 'swipe-down') {
    let startY = 0;
    gameArea.addEventListener('touchstart', (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    }, { passive: true });
    gameArea.addEventListener('touchend', (e: TouchEvent) => {
      if (gameCompleted) return;
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 50) {
        gameCompleted = true;
        onSuccess();
      }
    }, { passive: true });
    // Mouse fallback
    gameArea.addEventListener('mousedown', (e: MouseEvent) => { startY = e.clientY; });
    gameArea.addEventListener('mouseup', (e: MouseEvent) => {
      if (gameCompleted) return;
      if (e.clientY - startY > 50) {
        gameCompleted = true;
        onSuccess();
      }
    });
  }

  // LONG PRESS gesture - 喝第一口 / 吹蜡烛
  if (game.gesture === 'long-press') {
    const pressDuration = game.id === 8 ? 1000 : 500; // Blow candles = 1s, drink = 0.5s
    const longPressTarget = container.querySelector('#long-press-target');
    const circle = container.querySelector('.progress-ring circle') as SVGCircleElement;

    const startPress = (): void => {
      if (gameCompleted) return;
      longPressStart = Date.now();
      if (circle) {
        const totalDash = 440;
        const animDuration = pressDuration;
        const startTime = Date.now();
        const animateCircle = (): void => {
          if (gameCompleted) return;
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / animDuration, 1);
          circle.style.strokeDashoffset = String(totalDash * (1 - progress));
          if (progress < 1) {
            requestAnimationFrame(animateCircle);
          }
        };
        requestAnimationFrame(animateCircle);
      }
      longPressTimer = setTimeout(() => {
        if (gameCompleted) return;
        gameCompleted = true;
        onSuccess();
      }, pressDuration);
    };

    const endPress = (): void => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      if (circle) {
        circle.style.strokeDashoffset = '440';
      }
    };

    if (longPressTarget) {
      longPressTarget.addEventListener('touchstart', (e: Event) => { e.preventDefault(); startPress(); });
      longPressTarget.addEventListener('touchend', endPress);
      longPressTarget.addEventListener('mousedown', startPress);
      longPressTarget.addEventListener('mouseup', endPress);
      longPressTarget.addEventListener('mouseleave', endPress);
    }
  }

  // SHAKE UP-DOWN gesture - 摇一摇钙奶
  if (game.gesture === 'shake-ud') {
    let lastY = 0;
    let dirChanges = 0;
    let lastDir = '';
    const shakeDots = container.querySelectorAll('#shake-dots div');

    gameArea.addEventListener('touchstart', (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    }, { passive: true });
    gameArea.addEventListener('touchmove', (e: TouchEvent) => {
      if (gameCompleted) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - lastY;
      const dir = diff > 0 ? 'down' : 'up';
      if (dir !== lastDir && Math.abs(diff) > 20) {
        dirChanges++;
        lastDir = dir;
        lastY = currentY;
        playTick();

        // Update shake dots
        const progress = Math.min(dirChanges / 6, 1);
        shakeDots.forEach((dot, i) => {
          if (i < Math.floor(progress * 4)) {
            (dot as HTMLElement).style.background = 'var(--ad-green)';
          }
        });
      }
      if (dirChanges >= 6) {
        gameCompleted = true;
        onSuccess();
      }
    }, { passive: true });
    // Mouse fallback
    let mouseDown = false;
    gameArea.addEventListener('mousedown', (e: MouseEvent) => { mouseDown = true; lastY = e.clientY; });
    gameArea.addEventListener('mousemove', (e: MouseEvent) => {
      if (!mouseDown || gameCompleted) return;
      const currentY = e.clientY;
      const diff = currentY - lastY;
      const dir = diff > 0 ? 'down' : 'up';
      if (dir !== lastDir && Math.abs(diff) > 20) {
        dirChanges++;
        lastDir = dir;
        lastY = currentY;

        const progress = Math.min(dirChanges / 6, 1);
        shakeDots.forEach((dot, i) => {
          if (i < Math.floor(progress * 4)) {
            (dot as HTMLElement).style.background = 'var(--ad-green)';
          }
        });
      }
      if (dirChanges >= 6) {
        gameCompleted = true;
        onSuccess();
      }
    });
    gameArea.addEventListener('mouseup', () => { mouseDown = false; });
  }

  // MULTI TAP gesture - 收集30颗钙星
  if (game.gesture === 'multi-tap') {
    const multiTapTarget = container.querySelector('#multi-tap-target');
    const counterDots = container.querySelectorAll('#tap-counter .multi-tap-dot');

    if (multiTapTarget) {
      multiTapTarget.addEventListener('click', () => {
        if (gameCompleted) return;
        touchState.tapCount++;
        playTick();

        // Update dots
        if (counterDots[touchState.tapCount - 1]) {
          (counterDots[touchState.tapCount - 1] as HTMLElement).classList.add('filled');
        }

        if (touchState.tapCount >= 5) {
          gameCompleted = true;
          onSuccess();
        }
      });
    }
  }

  // SWIPE LEFT-RIGHT gesture - 接住掉落的AD钙奶
  if (game.gesture === 'swipe-lr') {
    let lastX = 0;
    let dirChanges = 0;
    let lastDir = '';

    gameArea.addEventListener('touchstart', (e: TouchEvent) => {
      lastX = e.touches[0].clientX;
    }, { passive: true });
    gameArea.addEventListener('touchmove', (e: TouchEvent) => {
      if (gameCompleted) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - lastX;
      const dir = diff > 0 ? 'right' : 'left';
      if (dir !== lastDir && Math.abs(diff) > 20) {
        dirChanges++;
        lastDir = dir;
        lastX = currentX;
      }
      if (dirChanges >= 2) {
        gameCompleted = true;
        onSuccess();
      }
    }, { passive: true });
    // Mouse fallback
    let mouseDown = false;
    gameArea.addEventListener('mousedown', (e: MouseEvent) => { mouseDown = true; lastX = e.clientX; });
    gameArea.addEventListener('mousemove', (e: MouseEvent) => {
      if (!mouseDown || gameCompleted) return;
      const currentX = e.clientX;
      const diff = currentX - lastX;
      const dir = diff > 0 ? 'right' : 'left';
      if (dir !== lastDir && Math.abs(diff) > 20) {
        dirChanges++;
        lastDir = dir;
        lastX = currentX;
      }
      if (dirChanges >= 2) {
        gameCompleted = true;
        onSuccess();
      }
    });
    gameArea.addEventListener('mouseup', () => { mouseDown = false; });
  }

  // RAPID SWIPE gesture - 撕开30周年标签
  if (game.gesture === 'rapid-swipe') {
    let lastX = 0;
    let swipeCount = 0;
    const energyBars = container.querySelectorAll('#energy-bars div > div');

    gameArea.addEventListener('touchstart', (e: TouchEvent) => {
      lastX = e.touches[0].clientX;
    }, { passive: true });
    gameArea.addEventListener('touchmove', (e: TouchEvent) => {
      if (gameCompleted) return;
      const currentX = e.touches[0].clientX;
      const diff = Math.abs(currentX - lastX);
      if (diff > 30) {
        swipeCount++;
        lastX = currentX;
        playTick();

        // Update energy bars (tear progress)
        const progress = Math.min(swipeCount / 8, 1);
        energyBars.forEach((bar, i) => {
          const barPct = Math.min(progress * 3 - i, 1) * 100;
          (bar as HTMLElement).style.width = `${Math.max(0, barPct)}%`;
        });

        if (swipeCount >= 8) {
          gameCompleted = true;
          onSuccess();
        }
      }
    }, { passive: true });
    // Mouse fallback
    let mouseDown = false;
    gameArea.addEventListener('mousedown', (e: MouseEvent) => { mouseDown = true; lastX = e.clientX; });
    gameArea.addEventListener('mousemove', (e: MouseEvent) => {
      if (!mouseDown || gameCompleted) return;
      const currentX = e.clientX;
      const diff = Math.abs(currentX - lastX);
      if (diff > 30) {
        swipeCount++;
        lastX = currentX;

        const progress = Math.min(swipeCount / 8, 1);
        energyBars.forEach((bar, i) => {
          const barPct = Math.min(progress * 3 - i, 1) * 100;
          (bar as HTMLElement).style.width = `${Math.max(0, barPct)}%`;
        });

        if (swipeCount >= 8) {
          gameCompleted = true;
          onSuccess();
        }
      }
    });
    gameArea.addEventListener('mouseup', () => { mouseDown = false; });
  }

  // DRAG gesture - 拼出AD钙奶30年
  if (game.gesture === 'drag') {
    const dragItem = container.querySelector('#drag-item') as HTMLElement;
    const dragTarget = container.querySelector('.drag-target') as HTMLElement;

    if (dragItem && dragTarget) {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      const onMove = (clientX: number, clientY: number): void => {
        if (!isDragging || gameCompleted) return;
        dragItem.style.position = 'fixed';
        dragItem.style.left = `${clientX - offsetX}px`;
        dragItem.style.top = `${clientY - offsetY}px`;
        dragItem.style.zIndex = '100';

        // Check if near target
        const targetRect = dragTarget.getBoundingClientRect();
        const itemRect = dragItem.getBoundingClientRect();
        const dist = Math.hypot(
          targetRect.left + targetRect.width / 2 - (itemRect.left + itemRect.width / 2),
          targetRect.top + targetRect.height / 2 - (itemRect.top + itemRect.height / 2)
        );
        if (dist < 60) {
          gameCompleted = true;
          isDragging = false;
          onSuccess();
        }
      };

      const onMouseMove = (e: MouseEvent): void => onMove(e.clientX, e.clientY);
      const onMouseUp = (): void => { isDragging = false; document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); };

      dragItem.addEventListener('touchstart', (e: TouchEvent) => {
        e.preventDefault();
        isDragging = true;
        const rect = dragItem.getBoundingClientRect();
        offsetX = e.touches[0].clientX - rect.left;
        offsetY = e.touches[0].clientY - rect.top;
      });
      dragItem.addEventListener('touchmove', (e: TouchEvent) => {
        e.preventDefault();
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: false });
      dragItem.addEventListener('touchend', () => { isDragging = false; });

      dragItem.addEventListener('mousedown', (e: MouseEvent) => {
        isDragging = true;
        const rect = dragItem.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  }

  // FIND TAP gesture - 找到隐藏的AD钙奶
  if (game.gesture === 'find-tap') {
    const findArea = container.querySelector('#find-area');
    if (findArea) {
      findArea.addEventListener('click', (e: Event) => {
        if (gameCompleted) return;
        const target = e.target as HTMLElement;
        if (target.dataset.target === 'true' || target.closest('[data-target="true"]')) {
          gameCompleted = true;
          const hiddenItem = target.closest('[data-target="true"]') as HTMLElement || target as HTMLElement;
          hiddenItem.style.transform = 'scale(2)';
          hiddenItem.style.transition = 'transform 0.3s';
          onSuccess();
        } else {
          target.classList.add('shake');
          setTimeout(() => target.classList.remove('shake'), 400);
        }
      });
    }
  }
}

// ========== Game Feedback ==========
const successEmojis = ['🥛', '✨', '🎉', '💚', '🫧', '🧴'];

function showGameFeedback(container: HTMLElement, success: boolean, game: MiniGame): void {
  const area = container.querySelector('#game-area');
  if (!area) return;

  if (success) {
    area.classList.add('success-flash');
    const emoji = document.createElement('div');
    emoji.className = 'feedback-emoji';
    emoji.style.fontSize = '60px';
    // Use theme-relevant emoji based on game
    const idx = (game.id - 1) % successEmojis.length;
    emoji.textContent = successEmojis[idx];
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 600);
  } else {
    // Show fail text with theme flavor
    const failText = document.createElement('div');
    failText.className = 'fail-text';
    failText.textContent = game.failText;
    failText.style.left = '50%';
    failText.style.top = '50%';
    failText.style.transform = 'translate(-50%, -50%)';
    area.appendChild(failText);
    setTimeout(() => failText.remove(), 1200);
  }
}

function handleGameFail(container: HTMLElement, game: MiniGame, onComplete: (score: number, results: boolean[]) => void): void {
  if (gameCompleted) return;
  gameCompleted = true;
  gameResults.push(false);
  playMiniFail();
  showGameFeedback(container, false, game);

  setTimeout(() => {
    currentGameIndex++;
    runNextGame(container, onComplete);
  }, 800);
}

// ========== Render Challenge Result ==========
export function renderChallengeResult(
  container: HTMLElement,
  score: number,
  results: boolean[],
  onContinue: StageTransition
): void {
  const rating = getRating(score);
  playSuccess();

  container.innerHTML = `
    <div class="page" style="justify-content: center;">
      <div class="result-card">
        <div style="font-size:14px; color:var(--ad-text-light); margin-bottom:8px;">30秒挑战完成！</div>
        <div class="result-age" style="font-size:48px;">${score}<span class="result-unit" style="font-size:18px;">/10</span></div>
        <div style="font-size:48px; margin:16px 0;">${rating.emoji}</div>
        <div class="result-label">${rating.label}</div>
        <div style="margin:16px auto 0; display:flex; gap:6px; justify-content:center; align-items:center;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:50px; filter:drop-shadow(0 2px 6px rgba(76,175,80,0.3));" />
          <img src="/images/ad-strawberry-220.webp" alt="草莓味" style="height:50px; filter:drop-shadow(0 2px 6px rgba(244,67,54,0.3));" />
          <img src="/images/ad-peach-220.webp" alt="蜜桃味" style="height:50px; filter:drop-shadow(0 2px 6px rgba(255,152,0,0.3));" />
        </div>
        <div style="margin-top:12px; display:flex; gap:4px; justify-content:center; flex-wrap:wrap;">
          ${results.map((r) => `
            <div style="width:24px; height:24px; border-radius:50%; background:${r ? 'var(--ad-green)' : '#F44336'}; display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:700;">
              ${r ? '✓' : '✗'}
            </div>
          `).join('')}
        </div>
        <div style="font-size:13px; color:var(--ad-text-light); margin-top:12px; line-height:1.6;">
          ${getRatingDescription(score)}
        </div>
      </div>
      <div style="margin-top:32px; width:100%; max-width:340px;">
        <button class="btn-primary w-full" id="btn-to-profile">
          生成我的快乐档案 📋
        </button>
      </div>
    </div>
  `;

  // Confetti for high scores
  if (score >= 7) {
    setTimeout(() => {
      const container2 = document.createElement('div');
      container2.className = 'confetti-burst';
      document.body.appendChild(container2);
      const colors = ['#4CAF50', '#FF9800', '#FFF9C4', '#81C784', '#FFCDD2'];
      for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / 30;
        const dist = 80 + Math.random() * 100;
        piece.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        piece.style.setProperty('--ty', `${Math.sin(angle) * dist - 50}px`);
        piece.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
        piece.style.setProperty('--dur', `${0.8 + Math.random() * 0.5}s`);
        container2.appendChild(piece);
      }
      setTimeout(() => container2.remove(), 1500);
    }, 300);
  }

  container.querySelector('#btn-to-profile')?.addEventListener('click', () => {
    playClick();
    onContinue('profile', {
      challengeScore: score,
      challengeRating: rating.label,
    });
  });
}

function getRating(score: number): { label: string; emoji: string } {
  if (score >= 10) return { label: '快乐万岁·传说级', emoji: '🏆' };
  if (score >= 7) return { label: '快乐王者', emoji: '👑' };
  if (score >= 4) return { label: '快乐达人', emoji: '🌟' };
  return { label: '快乐新手', emoji: '🌱' };
}

function getRatingDescription(score: number): string {
  if (score >= 10) return '满分通关！你就是快乐本乐，AD钙奶30周年快乐大使非你莫属！';
  if (score >= 7) return '太厉害了！你和AD钙奶的默契一流，是名副其实的快乐王者！';
  if (score >= 4) return '不错的表现！你对AD钙奶还是很有感情的，继续加油！';
  return '没关系，快乐从来不需要考核，先喝瓶AD钙奶压压惊！';
}
