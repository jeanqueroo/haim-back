import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { StoreEntity } from './store.entity';
import { UserEntity } from './user.entity';

@Entity("store_users")
@Unique(['storeId', 'userId'])
export class StoreUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number;

  @Column()
  userId: number;

  @Column({ default: false })
  isPrimary: boolean;

  @Column({ default: 'active' })
  status: string; // active, inactive

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;

  @ManyToOne(() => StoreEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeId' })
  store: StoreEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
