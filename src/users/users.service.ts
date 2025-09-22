import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


  async createFull(payload: {
    email: string;
    password: string;
    name: string;
    last_name: string;
    address: string;
    country: string;
    age: number;
    role: string[];
    gender: string;
  }): Promise<User> {
    console.log(payload);
    const hashed = await bcrypt.hash(payload.password, 10);
    const user = this.usersRepository.create({
      email: payload.email,
      password: hashed,
      name: payload.name,
      last_name: payload.last_name,
      address: payload.address,
      country: payload.country,
      age: payload.age,
      role: payload.role,
      gender: payload.gender,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    console.log(user);
    console.log(password);
    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);
    
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}