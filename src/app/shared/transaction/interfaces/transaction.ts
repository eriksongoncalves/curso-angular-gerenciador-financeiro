import { TransactionType } from '../enums/transaction-type';

export interface Transaction {
  title: string;
  type: TransactionType;
  value: number;
}
