
export default interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  type : "adm" | "stud";
  createdAt: string;
  updatedAt: string;
}