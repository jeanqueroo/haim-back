import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VENDEDOR = 'vendedor',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // hashed

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column()
  address: string;
  
  @Column()
  country: string;
  
  @Column()
  age: number;
  
  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,   // 👈 enum[]
  })
  roles: string[];
  
  @Column()
  gender: string;


}
