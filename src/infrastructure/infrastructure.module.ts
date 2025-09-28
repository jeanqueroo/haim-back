import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from './database/entities/user.entity';
import { StoreEntity } from './database/entities/store.entity';
import { TypeOrmUserRepository } from './repositories/user.repository';
import { TypeOrmStoreRepository } from './repositories/store.repository';
import { JwtStrategy } from './auth/jwt.strategy';
import { RefreshStrategy } from './auth/refresh.strategy';
import { RolesGuard } from './auth/roles.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, StoreEntity]),
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
    JwtStrategy,
    RefreshStrategy,
    RolesGuard,
  ],
  exports: ['UserRepository', 'StoreRepository', JwtStrategy, RefreshStrategy, RolesGuard],
})
export class InfrastructureModule {}
