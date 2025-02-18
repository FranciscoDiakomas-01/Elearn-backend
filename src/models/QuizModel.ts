export default interface IQuiz {
  id: number;
  proofid: number;
  content: string;
  suggest: string[];
  answer: string;
  createdAt: string;
  updatedAt: string;
  question: string;
  answerindex: number;
  status: boolean;
}
