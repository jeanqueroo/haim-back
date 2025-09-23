import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from './database/entities/user.entity';
import { TypeOrmUserRepository } from './repositories/user.repository';
import { JwtStrategy } from './auth/jwt.strategy';
import { RefreshStrategy } from './auth/refresh.strategy';
import { RolesGuard } from './auth/roles.guard';
import type { UserRepository } from '../domain/repositories/user.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    JwtStrategy,
    RefreshStrategy,
    RolesGuard,
  ],
  exports: ['UserRepository', JwtStrategy, RefreshStrategy, RolesGuard],
})
export class InfrastructureModule {}
