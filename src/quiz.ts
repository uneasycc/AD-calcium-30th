// Stage 1: Happy Age Test (Quiz)
import type { QuizQuestion, QuizResult, StageTransition } from './types';
import { playClick, playCorrect, playPop, playBubble } from './sound';
import { createBottleImage, getRandomProductKey, PRODUCT_IMAGES, type ProductImageKey } from './bottle';

// ========== Quiz Data - AD钙奶30周年专属题目 ==========
const questions: QuizQuestion[] = [
  {
    id: 1,
    text: '放学路上最期待的小卖部零食是？',
    emoji: '🏫',
    options: [
      { label: 'A', text: '辣条，越辣越爽', score: 3 },
      { label: 'B', text: '果冻，一口一个', score: 2 },
      { label: 'C', text: 'AD钙奶，灵魂之选', score: 1 },
    ],
  },
  {
    id: 2,
    text: '超市货架上看到AD钙奶，你会？',
    emoji: '🛒',
    options: [
      { label: 'A', text: '看看就走了', score: 3 },
      { label: 'B', text: '拿一排放购物车', score: 2 },
      { label: 'C', text: '整箱搬走！别拦我', score: 1 },
    ],
  },
  {
    id: 3,
    text: '小时候喝AD钙奶的方式是？',
    emoji: '🍼',
    options: [
      { label: 'A', text: '小口慢慢品', score: 3 },
      { label: 'B', text: '用吸管一口气喝完', score: 2 },
      { label: 'C', text: '先嘬一口再晃晃瓶子听声音', score: 1 },
    ],
  },
  {
    id: 4,
    text: 'AD钙奶30年了，你最想对它说什么？',
    emoji: '🎂',
    options: [
      { label: 'A', text: '陪伴是最长情的告白', score: 3 },
      { label: 'B', text: '不管几岁 快乐万岁！', score: 2 },
      { label: 'C', text: '再来一排！永远爱你', score: 1 },
    ],
  },
  {
    id: 5,
    text: '新口味AD钙奶你最想尝哪个？',
    emoji: '🍓',
    options: [
      { label: 'A', text: '草莓味，甜甜蜜蜜', score: 3 },
      { label: 'B', text: '蜜桃味，清新满分', score: 2 },
      { label: 'C', text: '全都要！成年人不做选择', score: 1 },
    ],
  },
];

// ========== Result Calculation ==========
const results: QuizResult[] = [
  { age: 6, label: '资深小朋友', emoji: '🍼' },
  { age: 9, label: '元气小可爱', emoji: '🌈' },
  { age: 12, label: '元气少年', emoji: '⚡' },
  { age: 18, label: '快乐青年', emoji: '🎸' },
  { age: 25, label: '成熟大朋友', emoji: '🎯' },
];

export function calculateQuizResult(answers: number[]): QuizResult {
  const scoreMap = [3, 2, 1]; // A=3, B=2, C=1
  const totalScore = answers.reduce((sum, ans) => sum + scoreMap[ans], 0);

  if (totalScore <= 7) return results[0];
  if (totalScore <= 9) return results[1];
  if (totalScore <= 11) return results[2];
  if (totalScore <= 13) return results[3];
  return results[4];
}

// ========== Feedback Emoji ==========
const feedbackEmojis: Record<number, string[]> = {
  0: ['😴', '🥱', '📱'], // A - boring adult
  1: ['😊', '🤭', '✨'], // B - fun
  2: ['🎉', '🥳', '🍼', '💚', '🎊'], // C - most fun!
};

function showFeedback(optionIndex: number): void {
  const emojis = feedbackEmojis[optionIndex];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  const el = document.createElement('div');
  el.className = 'feedback-emoji';
  el.textContent = emoji;
  document.body.appendChild(el);

  // Extra confetti for option C
  if (optionIndex === 2) {
    showConfetti();
  }

  setTimeout(() => el.remove(), 800);
}

function showConfetti(): void {
  const container = document.createElement('div');
  container.className = 'confetti-burst';
  document.body.appendChild(container);

  const colors = ['#4CAF50', '#FF9800', '#FFF9C4', '#81C784', '#FFCDD2'];
  for (let i = 0; i < 20; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / 20;
    const dist = 60 + Math.random() * 80;
    piece.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
    piece.style.setProperty('--ty', `${Math.sin(angle) * dist - 30}px`);
    piece.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
    piece.style.setProperty('--dur', `${0.8 + Math.random() * 0.5}s`);
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 1500);
}

// ========== Render Quiz ==========
let currentQuestion = 0;
let answers: number[] = [];

export function renderQuiz(container: HTMLElement, onResult: (answers: number[]) => void): void {
  currentQuestion = 0;
  answers = [];
  renderQuestion(container, onResult);
}

function renderQuestion(container: HTMLElement, onResult: (answers: number[]) => void): void {
  const q = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  // Pick a random product image for each question to showcase variety
  const productKey: ProductImageKey = ['ad-220', 'ad-strawberry-220', 'ad-peach-220', 'ad-lactic-450', 'ad-collagen-450'][currentQuestion % 5] as ProductImageKey;

  container.innerHTML = `
    <div class="page" style="justify-content: center;">
      <div style="margin-bottom:8px; display:flex; justify-content:center;">
        ${createBottleImage(productKey, { width: 60, showCap: false })}
      </div>
      <div style="font-size:48px; margin-bottom:12px;">${q.emoji}</div>
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width:${progress}%"></div>
      </div>
      <div style="font-size:13px; color:var(--ad-text-light); margin-bottom:20px;">
        第 ${currentQuestion + 1}/${questions.length} 题
      </div>
      <div class="quiz-card">
        <div style="font-size:18px; font-weight:700; text-align:center; margin-bottom:20px; line-height:1.5;">
          ${q.text}
        </div>
        <div id="quiz-options">
          ${q.options.map((opt, idx) => `
            <div class="quiz-option" data-index="${idx}" data-label="${opt.label}">
              <div class="quiz-option-label">${opt.label}</div>
              <div>${opt.text}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Bind option click events
  const optionsEl = container.querySelector('#quiz-options');
  if (!optionsEl) return;

  const optionEls = optionsEl.querySelectorAll('.quiz-option');
  optionEls.forEach((el) => {
    const idx = parseInt((el as HTMLElement).dataset.index || '0', 10);
    const label = (el as HTMLElement).dataset.label || '';

    const handler = () => {
      playClick();

      // Mark selected
      el.classList.add('selected');
      if (label === 'C') {
        el.classList.add('selected-c');
      }

      // Show feedback
      showFeedback(idx);
      if (idx === 2) {
        playCorrect();
        setTimeout(() => playBubble(), 100);
        setTimeout(() => playBubble(), 200);
      }

      // Disable all options
      optionEls.forEach((o) => {
        (o as HTMLElement).style.pointerEvents = 'none';
      });

      // Save answer and advance
      answers.push(idx);

      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          renderQuestion(container, onResult);
        } else {
          onResult(answers);
        }
      }, idx === 2 ? 1000 : 600);
    };

    el.addEventListener('click', handler, { once: true });
  });
}

// ========== Theme Splash → Render Quiz Result ==========
export function renderQuizResult(
  container: HTMLElement,
  answers: number[],
  onNext: StageTransition
): void {
  const result = calculateQuizResult(answers);

  // Step 1: Show dramatic theme splash "不管几岁，快乐万岁"
  showThemeSplash(container, () => {
    // Step 2: After splash, show result + challenge CTA
    renderResultContent(container, result, answers, onNext);
  });
}

function showThemeSplash(container: HTMLElement, onDone: () => void): void {
  playPop();

  container.innerHTML = `
    <div class="theme-splash" id="theme-splash">
      <div class="theme-splash-bg"></div>
      <div class="theme-splash-content">
        <div class="theme-splash-bottle">
          ${createBottleImage('ad-450', { width: 120, showCap: false })}
        </div>
        <div class="theme-splash-text" id="splash-text-1">不管几岁</div>
        <div class="theme-splash-text theme-splash-text-2" id="splash-text-2">快乐万岁</div>
        <div class="theme-splash-burst" id="splash-burst"></div>
      </div>
    </div>
  `;

  // Create burst particles
  const burst = document.getElementById('splash-burst');
  if (burst) {
    const colors = ['#4CAF50', '#FF9800', '#FFF9C4', '#81C784', '#FFCDD2', '#66BB6A'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'splash-particle';
      const angle = (Math.PI * 2 * i) / 30;
      const dist = 80 + Math.random() * 120;
      p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
      p.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      p.style.setProperty('--size', `${6 + Math.random() * 10}px`);
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      burst.appendChild(p);
    }
  }

  // Play a series of sounds for impact
  setTimeout(() => playBubble(), 200);
  setTimeout(() => playBubble(), 400);
  setTimeout(() => playBubble(), 600);

  // Animate: text appears with delay, then fade out
  const t1 = document.getElementById('splash-text-1');
  const t2 = document.getElementById('splash-text-2');
  const splash = document.getElementById('theme-splash');

  setTimeout(() => { if (t1) t1.classList.add('splash-visible'); playPop(); }, 300);
  setTimeout(() => { if (t2) t2.classList.add('splash-visible'); playPop(); }, 700);
  setTimeout(() => showConfetti(), 900);

  // Hold for a moment, then transition out
  setTimeout(() => {
    if (splash) splash.classList.add('splash-fade-out');
    setTimeout(onDone, 600);
  }, 2400);
}

function renderResultContent(
  container: HTMLElement,
  result: QuizResult,
  answers: number[],
  onNext: StageTransition
): void {
  playPop();

  const resultProductKey: ProductImageKey = result.age <= 9
    ? 'ad-strawberry-220'
    : result.age <= 12
      ? 'ad-peach-220'
      : result.age <= 18
        ? 'ad-lactic-450'
        : 'ad-collagen-450';

  container.innerHTML = `
    <div class="page" style="justify-content: center;">
      <div class="result-theme-banner">
        <span>不管几岁 · 快乐万岁</span>
      </div>
      <div style="margin-bottom:12px;">
        ${createBottleImage(resultProductKey, { width: 90, showCap: false })}
      </div>
      <div class="result-card">
        <div style="font-size:14px; color:var(--ad-text-light); margin-bottom:8px;">你的快乐年龄是</div>
        <div class="result-age">${result.age}</div>
        <div class="result-unit">岁</div>
        <div style="font-size:48px; margin:16px 0;">${result.emoji}</div>
        <div class="result-label">快乐年龄${result.age}岁 · ${result.label}</div>
        <div style="font-size:13px; color:var(--ad-text-light); margin-top:12px; line-height:1.6;">
          ${getResultDescription(result.age)}
        </div>
        <div style="font-size:11px; color:var(--ad-green); margin-top:8px; font-weight:600;">
          ${FLAVOR_SUGGESTION[result.age] || ''}
        </div>
      </div>
      <div style="margin-top:32px; width:100%; max-width:340px;">
        <button class="btn-primary btn-orange w-full" id="btn-next-challenge">
          敢不敢挑战30秒快乐闯关？ 🎮
        </button>
      </div>
    </div>
  `;

  // Confetti celebration
  setTimeout(() => showConfetti(), 300);

  const btn = container.querySelector('#btn-next-challenge');
  btn?.addEventListener('click', () => {
    playClick();
    onNext('challenge-intro', {
      quizAnswers: answers,
      happyAge: result.age,
      happyLabel: result.label,
    });
  });
}

const FLAVOR_SUGGESTION: Record<number, string> = {
  6: '你的本命口味：草莓味AD钙奶 🍓',
  9: '推荐搭配：蜜桃味AD钙奶 🍑',
  12: '能量加满：乳酸菌AD钙奶 💪',
  18: '精致之选：胶原蛋白AD钙奶 ✨',
  25: '经典永不过时：原味AD钙奶 🥛',
};

function getResultDescription(age: number): string {
  const descriptions: Record<number, string> = {
    6: '你的内心住着一个永远长不大的小孩！AD钙奶对你来说不是饮料，是续命水！不管几岁，快乐万岁！',
    9: '你保留了童真的同时又有自己的小想法，选AD钙奶从不犹豫——你是真正的快乐达人！',
    12: '你正在探索世界的阶段，对每一款新口味都充满好奇！30年经典和新鲜口味你都要！',
    18: '你懂得在成长中保持快乐，成熟不意味着丢掉童趣！AD钙奶30年陪你一起长大！',
    25: '你是稳重的大朋友，但提到AD钙奶就秒变小朋友！30年的陪伴，是最长情的快乐！',
  };
  return descriptions[age] || descriptions[12];
}

export { questions };
