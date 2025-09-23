import { User } from '../entities/user.entity';

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: number, user: Partial<Omit<User, 'id'>>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
  validateCredentials(email: string, password: string): Promise<User | null>;
}
