import { create } from "zustand";
import { type Question } from "@/types/question";
import { questions } from "@/lib/data/questions";

interface State {
  questions: Question[];
  currentQuestion: number;
  getQuestions: () => void;
}

const useQuestionStore = create<State>((set) => ({
  questions: [],
  currentQuestion: 0,
  getQuestions: () => {
    set({ questions });
  },
}));

export { useQuestionStore } 
