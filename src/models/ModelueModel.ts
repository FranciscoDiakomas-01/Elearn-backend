export default interface IModel {
  id: number;
  courseId: number;
  title: string;
  description: string;
  price : number,
  ordernum : number,
  cover: string;
  totalLessons: number;
  createdAt: string;
  updatedAt: string;
  status : boolean
  
}
