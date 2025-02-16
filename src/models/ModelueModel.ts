export default interface IModel {
  id: number;
  courseId: number;
  title: string;
  description: string;
  cover?: string;
  totalLessons: number;
  createdAt: string;
  updatedAt: string;
}
