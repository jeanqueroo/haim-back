import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../database/entities/user.entity';
import { UserMapper } from '../database/mappers/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { id } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { email } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.userRepository.find();
    return UserMapper.toDomainList(entities);
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const entity = UserMapper.toEntity(user as User);
    const savedEntity = await this.userRepository.save(entity);
    return UserMapper.toDomain(savedEntity);
  }

  async update(id: number, userData: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const existingEntity = await this.userRepository.findOne({ where: { id } });
    if (!existingEntity) {
      return null;
    }

    // Actualizar solo los campos proporcionados
    Object.assign(existingEntity, userData);
    
    const savedEntity = await this.userRepository.save(existingEntity);
    return UserMapper.toDomain(savedEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async validateCredentials(email: string, password: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { email } });
    
    if (entity && await bcrypt.compare(password, entity.password)) {
      return UserMapper.toDomain(entity);
    }
    
    return null;
  }
}
