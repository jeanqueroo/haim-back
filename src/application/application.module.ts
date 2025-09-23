import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateUserUseCase } from './use-cases/user/create-user.use-case';
import { GetUserUseCase, GetUserByEmailUseCase, GetAllUsersUseCase } from './use-cases/user/get-user.use-case';
import { UpdateUserUseCase } from './use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/user/delete-user.use-case';
import { LoginUseCase } from './use-cases/auth/login.use-case';
import { RefreshTokenUseCase } from './use-cases/auth/refresh-token.use-case';

@Module({
  imports: [
    InfrastructureModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    // User Use Cases
    CreateUserUseCase,
    GetUserUseCase,
    GetUserByEmailUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    
    // Auth Use Cases
    LoginUseCase,
    RefreshTokenUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserUseCase,
    GetUserByEmailUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
  ],
})
export class ApplicationModule {}
