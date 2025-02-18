export default interface IPost {
  id: number;
  title: string;
  description: string;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  bg: string;
  status: boolean;
}