import { create } from 'zustand';

export interface QuizAnswer {
  questionId: number;
  answer: string;
  timestamp: number;
}

export interface QuizState {
  answers: QuizAnswer[];
  currentQuestion: number;
  isCompleted: boolean;
  addAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  answers: [],
  currentQuestion: 1,
  isCompleted: false,
  
  addAnswer: (questionId: number, answer: string) => {
    const { answers } = get();
    const existingIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingIndex >= 0) {
      // Update existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingIndex] = {
        questionId,
        answer,
        timestamp: Date.now(),
      };
      set({ answers: updatedAnswers });
    } else {
      // Add new answer
      set({
        answers: [...answers, {
          questionId,
          answer,
          timestamp: Date.now(),
        }]
      });
    }
  },
  
  nextQuestion: () => {
    const { currentQuestion } = get();
    if (currentQuestion < 11) {
      set({ currentQuestion: currentQuestion + 1 });
    }
  },
  
  resetQuiz: () => {
    set({
      answers: [],
      currentQuestion: 1,
      isCompleted: false,
    });
  },
  
  completeQuiz: () => {
    set({ isCompleted: true });
  },
}));