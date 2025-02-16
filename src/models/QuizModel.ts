export default interface IQuiz {
  id: number;
  proofId : number
  content: string;
  suggest: string[];
  answer: string;
  createdAt: string;
  updatedAt: string;
}
