// Main App - State Machine & Stage Orchestration
import type { GameState, Stage } from './types';
import { renderQuiz, renderQuizResult, calculateQuizResult } from './quiz';
import { renderChallengeIntro, renderChallenge, renderChallengeResult } from './challenge';
import { renderProfile, renderEasterEgg } from './profile';
import { createBubbleBackground, showBottleOpening, createDeskSceneBottle } from './bottle';
import { playClick, playPop } from './sound';

// ========== State ==========
const state: GameState = {
  stage: 'intro',
  quizAnswers: [],
  happyAge: 0,
  happyLabel: '',
  challengeScore: 0,
  challengeRating: '',
  challengeResults: [],
  personalityTag: '',
  blessing: '',
};

let appContainer: HTMLElement | null = null;

// ========== Initialize App ==========
export function initApp(): void {
  appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('App container not found');
    return;
  }

  // Create bubble background (persistent)
  createBubbleBackground(appContainer);

  // Start with intro
  renderStage('intro');
}

// ========== Stage Rendering ==========
function renderStage(stage: Stage, withTransition = true): void {
  if (!appContainer) return;

  state.stage = stage;

  // Create content container (separate from bubble bg)
  const existingContent = appContainer.querySelector('.stage-content');
  if (existingContent) {
    if (withTransition) {
      existingContent.classList.add('page-exit');
      setTimeout(() => {
        existingContent.remove();
        createNewStage(stage);
      }, 300);
    } else {
      existingContent.remove();
      createNewStage(stage);
    }
  } else {
    createNewStage(stage);
  }
}

function createNewStage(stage: Stage): void {
  if (!appContainer) return;

  const content = document.createElement('div');
  content.className = 'stage-content';
  appContainer.appendChild(content);

  switch (stage) {
    case 'intro':
      renderIntro(content);
      break;
    case 'quiz':
      renderQuizStage(content);
      break;
    case 'quiz-result':
      renderQuizResultStage(content);
      break;
    case 'challenge-intro':
      renderChallengeIntroStage(content);
      break;
    case 'challenge':
      renderChallengeStage(content);
      break;
    case 'challenge-result':
      renderChallengeResultStage(content);
      break;
    case 'profile':
      renderProfileStage(content);
      break;
    case 'easter-egg':
      renderEasterEggStage(content);
      break;
  }
}

// ========== Stage: Intro ==========
function renderIntro(container: HTMLElement): void {
  container.innerHTML = `
    <div class="page" style="justify-content: center;">
      <div style="font-size:13px; color:var(--ad-green); font-weight:600; letter-spacing:4px; margin-bottom:8px;">
        AD钙奶30周年
      </div>
      <div class="title-main" style="margin-bottom:4px;">
        不管几岁
      </div>
      <div class="title-main" style="color:var(--ad-orange);">
        快乐万岁
      </div>
      <div style="width:40px; height:3px; background:var(--ad-green); border-radius:2px; margin:16px auto;"></div>
      <div id="desk-scene-area"></div>
      <div style="margin-top:24px; font-size:12px; color:var(--ad-text-light); text-align:center; line-height:1.6;">
        点击瓶盖开启你的快乐之旅<br>
        🥛 30周年特别企划 🥛
      </div>
    </div>
  `;

  // Add desk scene with bottle
  const sceneArea = container.querySelector('#desk-scene-area');
  if (sceneArea) {
    sceneArea.innerHTML = createDeskSceneBottle(() => {
      handleIntroBottleClick(container);
    });

    // Bind click event to bottle
    const bottle = sceneArea.querySelector('#intro-bottle');
    if (bottle) {
      bottle.addEventListener('click', () => {
        handleIntroBottleClick(container);
      });
    }
  }
}

function handleIntroBottleClick(container: HTMLElement): void {
  playPop();
  showBottleOpening(container, () => {
    renderStage('quiz');
  });
}

// ========== Stage: Quiz ==========
function renderQuizStage(container: HTMLElement): void {
  renderQuiz(container, (answers) => {
    state.quizAnswers = answers;
    const result = calculateQuizResult(answers);
    state.happyAge = result.age;
    state.happyLabel = result.label;

    showBottleOpening(container, () => {
      renderStage('quiz-result', false);
    });
  });
}

// ========== Stage: Quiz Result ==========
function renderQuizResultStage(container: HTMLElement): void {
  renderQuizResult(container, state.quizAnswers, (nextStage, data) => {
    Object.assign(state, data);
    showBottleOpening(container, () => {
      renderStage(nextStage);
    });
  });
}

// ========== Stage: Challenge Intro ==========
function renderChallengeIntroStage(container: HTMLElement): void {
  renderChallengeIntro(container, () => {
    renderStage('challenge');
  });
}

// ========== Stage: Challenge ==========
function renderChallengeStage(container: HTMLElement): void {
  renderChallenge(container, (score, results) => {
    state.challengeScore = score;
    state.challengeResults = results;
    const rating = getChallengeRating(score);
    state.challengeRating = rating;

    showBottleOpening(container, () => {
      renderStage('challenge-result', false);
    });
  });
}

// ========== Stage: Challenge Result ==========
function renderChallengeResultStage(container: HTMLElement): void {
  renderChallengeResult(container, state.challengeScore, state.challengeResults, (nextStage, data) => {
    Object.assign(state, data);
    showBottleOpening(container, () => {
      renderStage(nextStage);
    });
  });
}

// ========== Stage: Profile ==========
function renderProfileStage(container: HTMLElement): void {
  renderProfile(container, state, (nextStage, data) => {
    Object.assign(state, data);
    if (nextStage === 'easter-egg') {
      renderStage(nextStage);
    }
  });
}

// ========== Stage: Easter Egg ==========
function renderEasterEggStage(container: HTMLElement): void {
  renderEasterEgg(container, () => {
    renderStage('profile');
  });
}

// ========== Helper ==========
function getChallengeRating(score: number): string {
  if (score >= 10) return '快乐万岁·传说级';
  if (score >= 7) return '快乐王者';
  if (score >= 4) return '快乐达人';
  return '快乐新手';
}
