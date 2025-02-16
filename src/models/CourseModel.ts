export default interface ICourse {
  id: number;
  title: string;
  description: string;
  cover ?: string;
  createdAt: string;
  updatedAt: string;
  totalModules: number;
  totalLessons: number;
}
