// ========== Game State Types ==========

export type Stage = 'intro' | 'quiz' | 'quiz-result' | 'challenge-intro' | 'challenge' | 'challenge-result' | 'profile' | 'easter-egg';

export interface GameState {
  stage: Stage;
  quizAnswers: number[];       // 0=A, 1=B, 2=C per question
  happyAge: number;
  happyLabel: string;
  challengeScore: number;
  challengeRating: string;
  challengeResults: boolean[]; // Per-game success/fail
  personalityTag: string;
  blessing: string;
}

// ========== Quiz Types ==========

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
  emoji: string;
}

export interface QuizOption {
  label: string;   // A, B, C
  text: string;
  score: number;   // 1=C(youngest), 2=B, 3=A(most mature)
}

export interface QuizResult {
  age: number;
  label: string;
  emoji: string;
}

// ========== Challenge Types ==========

export type GestureType = 'tap' | 'swipe-down' | 'long-press' | 'multi-tap' | 'shake-ud' | 'swipe-lr' | 'rapid-swipe' | 'drag' | 'find-tap';

export type VisualStyle = 'pixel' | 'handdrawn' | '3d' | 'comic' | 'neon';

export interface MiniGame {
  id: number;
  title: string;
  instruction: string;
  gesture: GestureType;
  icon: string;
  failText: string;
}

export interface ChallengeResult {
  score: number;
  rating: string;
  emoji: string;
}

// ========== Profile Types ==========

export interface ProfileData {
  happyAge: number;
  happyLabel: string;
  challengeRating: string;
  personalityTag: string;
  blessing: string;
}

// ========== Callback Types ==========

export type StageTransition = (nextStage: Stage, data?: Partial<GameState>) => void;
