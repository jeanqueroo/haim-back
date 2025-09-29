import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreUserEntity } from '../database/entities/store-user.entity';
import { StoreUser } from '../../domain/entities/store-user.entity';
import { StoreUserMapper } from '../database/mappers/store-user.mapper';
import type { StoreUserRepository } from '../../domain/repositories/store-user.repository.interface';

@Injectable()
export class TypeOrmStoreUserRepository implements StoreUserRepository {
  constructor(
    @InjectRepository(StoreUserEntity)
    private readonly storeUserRepository: Repository<StoreUserEntity>,
  ) {}

  async findById(id: number): Promise<StoreUser | null> {
    const storeUserEntity = await this.storeUserRepository.findOne({ where: { id } });
    if (!storeUserEntity) {
      return null;
    }
    return this.toDomain(storeUserEntity);
  }

  async findByStoreId(storeId: number): Promise<StoreUser[]> {
    const storeUserEntities = await this.storeUserRepository.find({ 
      where: { storeId },
      order: { isPrimary: 'DESC', joinedAt: 'ASC' }
    });
    return storeUserEntities.map(entity => this.toDomain(entity));
  }

  async findByUserId(userId: number): Promise<StoreUser[]> {
    const storeUserEntities = await this.storeUserRepository.find({ 
      where: { userId },
      order: { isPrimary: 'DESC', joinedAt: 'ASC' }
    });
    return storeUserEntities.map(entity => this.toDomain(entity));
  }

  async findByStoreIdAndUserId(storeId: number, userId: number): Promise<StoreUser | null> {
    const storeUserEntity = await this.storeUserRepository.findOne({ 
      where: { storeId, userId } 
    });
    if (!storeUserEntity) {
      return null;
    }
    return this.toDomain(storeUserEntity);
  }

  async findPrimaryUserByStoreId(storeId: number): Promise<StoreUser | null> {
    const storeUserEntity = await this.storeUserRepository.findOne({ 
      where: { storeId, isPrimary: true } 
    });
    if (!storeUserEntity) {
      return null;
    }
    return this.toDomain(storeUserEntity);
  }

  async create(storeUser: Omit<StoreUser, 'id'>): Promise<StoreUser> {
    const storeUserEntity = this.toEntity(storeUser as StoreUser);
    const savedEntity = await this.storeUserRepository.save(storeUserEntity);
    return this.toDomain(savedEntity);
  }

  async update(id: number, storeUser: Partial<Omit<StoreUser, 'id'>>): Promise<StoreUser | null> {
    const existingEntity = await this.storeUserRepository.findOne({ where: { id } });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity = await this.storeUserRepository.save({
      ...existingEntity,
      ...this.toEntity(storeUser as StoreUser),
    });

    return this.toDomain(updatedEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.storeUserRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async setPrimaryUser(storeId: number, userId: number): Promise<StoreUser | null> {
    // Primero, quitar el estado de primary de todos los usuarios de la tienda
    await this.storeUserRepository.update(
      { storeId },
      { isPrimary: false }
    );

    // Luego, establecer el nuevo usuario como primary
    const result = await this.storeUserRepository.update(
      { storeId, userId },
      { isPrimary: true }
    );

    if (result.affected && result.affected > 0) {
      return await this.findByStoreIdAndUserId(storeId, userId);
    }

    return null;
  }

  async removeUserFromStore(storeId: number, userId: number): Promise<boolean> {
    const result = await this.storeUserRepository.delete({ storeId, userId });
    return result.affected ? result.affected > 0 : false;
  }

  private toDomain(entity: StoreUserEntity): StoreUser {
    return StoreUserMapper.toDomain(entity);
  }

  private toEntity(storeUser: StoreUser | Partial<StoreUser>): Partial<StoreUserEntity> {
    return StoreUserMapper.toEntity(storeUser as StoreUser);
  }
}
