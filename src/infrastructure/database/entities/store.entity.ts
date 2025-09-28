import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

export enum StoreType {
  RETAIL = 'retail',
  WHOLESALE = 'wholesale',
  ONLINE = 'online',
  RESTAURANT = 'restaurant',
  PHARMACY = 'pharmacy',
  CLOTHING = 'clothing',
  ELECTRONICS = 'electronics',
  GROCERY = 'grocery',
  TRUCK = 'truck',
  STORE = 'store',
  SUPERMARKET = 'supermarket',
  OTHER = 'other',
}

@Entity("stores")
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: StoreType,
  })
  storeType: StoreType;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
