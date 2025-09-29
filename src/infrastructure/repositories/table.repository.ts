import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from '../database/entities/table.entity';
import { Table } from '../../domain/entities/table.entity';
import { TableMapper } from '../database/mappers/table.mapper';
import type { TableRepository } from '../../domain/repositories/table.repository.interface';

@Injectable()
export class TypeOrmTableRepository implements TableRepository {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
  ) {}

  async findById(id: number): Promise<Table | null> {
    const tableEntity = await this.tableRepository.findOne({ where: { id } });
    if (!tableEntity) {
      return null;
    }
    return this.toDomain(tableEntity);
  }

  async findByTableNumber(tableNumber: number, storeId: number): Promise<Table | null> {
    const tableEntity = await this.tableRepository.findOne({ where: { tableNumber, storeId } });
    if (!tableEntity) {
      return null;
    }
    return this.toDomain(tableEntity);
  }

  async findByStatus(status: string): Promise<Table[]> {
    const tableEntities = await this.tableRepository.find({ where: { status: status as any } });
    return tableEntities.map(entity => this.toDomain(entity));
  }

  async findByStoreId(storeId: number): Promise<Table[]> {
    const tableEntities = await this.tableRepository.find({ where: { storeId } });
    return tableEntities.map(entity => this.toDomain(entity));
  }

  async findByStoreIdAndStatus(storeId: number, status: string): Promise<Table[]> {
    const tableEntities = await this.tableRepository.find({ where: { storeId, status: status as any } });
    return tableEntities.map(entity => this.toDomain(entity));
  }

  async findAll(): Promise<Table[]> {
    const tableEntities = await this.tableRepository.find();
    return tableEntities.map(entity => this.toDomain(entity));
  }

  async create(table: Omit<Table, 'id'>): Promise<Table> {
    const tableEntity = this.toEntity(table as Table);
    const savedEntity = await this.tableRepository.save(tableEntity);
    return this.toDomain(savedEntity);
  }

  async update(id: number, table: Partial<Omit<Table, 'id'>>): Promise<Table | null> {
    const existingEntity = await this.tableRepository.findOne({ where: { id } });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity = await this.tableRepository.save({
      ...existingEntity,
      ...this.toEntity(table as Table),
    });

    return this.toDomain(updatedEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.tableRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  private toDomain(entity: TableEntity): Table {
    return TableMapper.toDomain(entity);
  }

  private toEntity(table: Table | Partial<Table>): Partial<TableEntity> {
    return TableMapper.toEntity(table as Table);
  }
}
