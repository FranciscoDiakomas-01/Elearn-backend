export default interface IPayment {
  id: number;
  studentid: number;
  moduleid: number;
  walletid: number;
  payed: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
