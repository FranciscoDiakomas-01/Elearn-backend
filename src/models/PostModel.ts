export default interface IPost {
  id: number;
  title :string,
  description : string,
  cover ?: string,
  likes : number,
  comments : number
  createdAt: string;
  updatedAt: string;
}