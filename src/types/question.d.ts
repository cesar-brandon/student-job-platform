export interface Question {
  id: string;
  question: string;
  options?: Option[];
  answer: null | string | string[];
}

interface Option {
  id: string;
  value: string;
}
