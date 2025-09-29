import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from './database/entities/user.entity';
import { StoreEntity } from './database/entities/store.entity';
import { TableEntity } from './database/entities/table.entity';
import { StoreUserEntity } from './database/entities/store-user.entity';
import { TypeOrmUserRepository } from './repositories/user.repository';
import { TypeOrmStoreRepository } from './repositories/store.repository';
import { TypeOrmTableRepository } from './repositories/table.repository';
import { TypeOrmStoreUserRepository } from './repositories/store-user.repository';
import { JwtStrategy } from './auth/jwt.strategy';
import { RefreshStrategy } from './auth/refresh.strategy';
import { RolesGuard } from './auth/roles.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, StoreEntity, TableEntity, StoreUserEntity]),
    PassportModule,
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'StoreRepository',
      useClass: TypeOrmStoreRepository,
    },
    {
      provide: 'TableRepository',
      useClass: TypeOrmTableRepository,
    },
    {
      provide: 'StoreUserRepository',
      useClass: TypeOrmStoreUserRepository,
    },
    JwtStrategy,
    RefreshStrategy,
    RolesGuard,
  ],
  exports: ['UserRepository', 'StoreRepository', 'TableRepository', 'StoreUserRepository', JwtStrategy, RefreshStrategy, RolesGuard],
})
export class InfrastructureModule {}
