import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateUserUseCase } from './use-cases/user/create-user.use-case';
import { GetUserUseCase, GetUserByEmailUseCase, GetAllUsersUseCase } from './use-cases/user/get-user.use-case';
import { UpdateUserUseCase } from './use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/user/delete-user.use-case';
import { LoginUseCase } from './use-cases/auth/login.use-case';
import { RefreshTokenUseCase } from './use-cases/auth/refresh-token.use-case';
import { CreateStoreUseCase } from './use-cases/store/create-store.use-case';
import { GetStoreUseCase, GetStoresByUserIdUseCase, GetAllStoresUseCase } from './use-cases/store/get-store.use-case';
import { UpdateStoreUseCase } from './use-cases/store/update-store.use-case';
import { DeleteStoreUseCase } from './use-cases/store/delete-store.use-case';

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
    
    // Store Use Cases
    CreateStoreUseCase,
    GetStoreUseCase,
    GetStoresByUserIdUseCase,
    GetAllStoresUseCase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,
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
    CreateStoreUseCase,
    GetStoreUseCase,
    GetStoresByUserIdUseCase,
    GetAllStoresUseCase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,
  ],
})
export class ApplicationModule {}
