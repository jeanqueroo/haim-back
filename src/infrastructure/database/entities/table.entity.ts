import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { StoreEntity } from './store.entity';

export enum TableStatus {
  FREE = 'free',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
}

@Entity("tables")
export class TableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableNumber: number;

  @Column()
  capacity: number;

  @Column({
    type: 'enum',
    enum: TableStatus,
    default: TableStatus.FREE,
  })
  status: TableStatus;

  @Column()
  storeId: number;

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: 'storeId' })
  store: StoreEntity;
}
