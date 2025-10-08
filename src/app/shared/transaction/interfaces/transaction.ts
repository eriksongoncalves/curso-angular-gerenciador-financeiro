import { TransactionType } from '../enums/transaction-type';

export interface Transaction {
  id: number;
  title: string;
  type: TransactionType;
  value: number;
}

export type TransactionPayload = Omit<Transaction, 'id'>;
