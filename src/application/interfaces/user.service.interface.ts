import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface UserServiceInterface {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findUserById(id: number): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findAllUsers(): Promise<User[]>;
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;
}
