import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { StoreController } from './controllers/store.controller';
import { TableController } from './controllers/table.controller';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController, AuthController, StoreController, TableController],
})
export class PresentationModule {}

