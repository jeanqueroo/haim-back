import { Store } from '../entities/store.entity';

export interface StoreRepository {
  findById(id: number): Promise<Store | null>;
  findByUserId(userId: number): Promise<Store[]>;
  findByName(name: string): Promise<Store[]>;
  findAll(): Promise<Store[]>;
  create(store: Omit<Store, 'id'>): Promise<Store>;
  update(id: number, store: Partial<Omit<Store, 'id'>>): Promise<Store | null>;
  delete(id: number): Promise<boolean>;
}
