import { StoreUser } from '../entities/store-user.entity';

export interface StoreUserRepository {
  findById(id: number): Promise<StoreUser | null>;
  findByStoreId(storeId: number): Promise<StoreUser[]>;
  findByUserId(userId: number): Promise<StoreUser[]>;
  findByStoreIdAndUserId(storeId: number, userId: number): Promise<StoreUser | null>;
  findPrimaryUserByStoreId(storeId: number): Promise<StoreUser | null>;
  create(storeUser: Omit<StoreUser, 'id'>): Promise<StoreUser>;
  update(id: number, storeUser: Partial<Omit<StoreUser, 'id'>>): Promise<StoreUser | null>;
  delete(id: number): Promise<boolean>;
  setPrimaryUser(storeId: number, userId: number): Promise<StoreUser | null>;
  removeUserFromStore(storeId: number, userId: number): Promise<boolean>;
}
