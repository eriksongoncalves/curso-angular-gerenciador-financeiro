import { TransactionType } from '../enums/transaction-type';

export interface Transaction {
  id: string;
  title: string;
  type: TransactionType;
  value: number;
}
