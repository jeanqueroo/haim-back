import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreEntity } from '../database/entities/store.entity';
import { Store } from '../../domain/entities/store.entity';
import { StoreMapper } from '../database/mappers/store.mapper';
import type { StoreRepository } from '../../domain/repositories/store.repository.interface';

@Injectable()
export class TypeOrmStoreRepository implements StoreRepository {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}

  async findById(id: number): Promise<Store | null> {
    const storeEntity = await this.storeRepository.findOne({ where: { id } });
    if (!storeEntity) {
      return null;
    }
    return this.toDomain(storeEntity);
  }

  async findByUserId(userId: number): Promise<Store[]> {
    const storeEntities = await this.storeRepository.find({ where: { userId } });
    return storeEntities.map(entity => this.toDomain(entity));
  }

  async findByName(name: string): Promise<Store[]> {
    const storeEntities = await this.storeRepository
      .createQueryBuilder('store')
      .where('store.name ILIKE :name', { name: `%${name}%` })
      .getMany();
    return storeEntities.map(entity => this.toDomain(entity));
  }

  async findAll(): Promise<Store[]> {
    const storeEntities = await this.storeRepository.find();
    return storeEntities.map(entity => this.toDomain(entity));
  }

  async create(store: Omit<Store, 'id'>): Promise<Store> {
    const storeEntity = this.toEntity(store);
    const savedEntity = await this.storeRepository.save(storeEntity);
    return this.toDomain(savedEntity);
  }

  async update(id: number, store: Partial<Omit<Store, 'id'>>): Promise<Store | null> {
    const existingEntity = await this.storeRepository.findOne({ where: { id } });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity = await this.storeRepository.save({
      ...existingEntity,
      ...this.toEntity(store as Store),
    });

    return this.toDomain(updatedEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.storeRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  private toDomain(entity: StoreEntity): Store {
    return StoreMapper.toDomain(entity);
  }

  private toEntity(store: Store | Partial<Store>): Partial<StoreEntity> {
    return StoreMapper.toEntity(store as Store);
  }
}
