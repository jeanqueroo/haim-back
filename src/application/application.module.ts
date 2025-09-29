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
import { GetStoreUseCase, GetStoresByUserIdUseCase, GetAllStoresUseCase, GetStoresByNameUseCase } from './use-cases/store/get-store.use-case';
import { UpdateStoreUseCase } from './use-cases/store/update-store.use-case';
import { DeleteStoreUseCase } from './use-cases/store/delete-store.use-case';
import { CreateTableUseCase } from './use-cases/table/create-table.use-case';
import { GetTableUseCase, GetAllTablesUseCase, GetTablesByStatusUseCase, GetTablesByStoreIdUseCase, GetTablesByStoreIdAndStatusUseCase } from './use-cases/table/get-table.use-case';
import { UpdateTableUseCase } from './use-cases/table/update-table.use-case';
import { DeleteTableUseCase } from './use-cases/table/delete-table.use-case';
import { AddUserToStoreUseCase } from './use-cases/store-user/add-user-to-store.use-case';
import { GetStoreUsersUseCase, GetUserStoresUseCase, GetPrimaryUserByStoreUseCase } from './use-cases/store-user/get-store-users.use-case';
import { RemoveUserFromStoreUseCase, SetPrimaryUserUseCase } from './use-cases/store-user/remove-user-from-store.use-case';

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
    GetStoresByNameUseCase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,
    
    // Table Use Cases
    CreateTableUseCase,
    GetTableUseCase,
    GetAllTablesUseCase,
    GetTablesByStatusUseCase,
    GetTablesByStoreIdUseCase,
    GetTablesByStoreIdAndStatusUseCase,
    UpdateTableUseCase,
    DeleteTableUseCase,
    
    // Store-User Use Cases
    AddUserToStoreUseCase,
    GetStoreUsersUseCase,
    GetUserStoresUseCase,
    GetPrimaryUserByStoreUseCase,
    RemoveUserFromStoreUseCase,
    SetPrimaryUserUseCase,
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
    GetStoresByNameUseCase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,
    CreateTableUseCase,
    GetTableUseCase,
    GetAllTablesUseCase,
    GetTablesByStatusUseCase,
    GetTablesByStoreIdUseCase,
    GetTablesByStoreIdAndStatusUseCase,
    UpdateTableUseCase,
    DeleteTableUseCase,
    AddUserToStoreUseCase,
    GetStoreUsersUseCase,
    GetUserStoresUseCase,
    GetPrimaryUserByStoreUseCase,
    RemoveUserFromStoreUseCase,
    SetPrimaryUserUseCase,
  ],
})
export class ApplicationModule {}
