import { Table } from '../entities/table.entity';

export interface TableRepository {
  findById(id: number): Promise<Table | null>;
  findByTableNumber(tableNumber: number, storeId: number): Promise<Table | null>;
  findByStatus(status: string): Promise<Table[]>;
  findByStoreId(storeId: number): Promise<Table[]>;
  findByStoreIdAndStatus(storeId: number, status: string): Promise<Table[]>;
  findAll(): Promise<Table[]>;
  create(table: Omit<Table, 'id'>): Promise<Table>;
  update(id: number, table: Partial<Omit<Table, 'id'>>): Promise<Table | null>;
  delete(id: number): Promise<boolean>;
}
