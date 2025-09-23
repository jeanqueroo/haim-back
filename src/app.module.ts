import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';
import { ProtectedController } from './protected/protected.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: parseInt(process.env.DB_PORT as string),
        username: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
        entities: [__dirname + '/infrastructure/database/entities/*.entity{.ts,.js}'],
        synchronize: true, // ⚠️ solo en desarrollo
      }),
    }),
    InfrastructureModule,
    ApplicationModule,
    PresentationModule,
  ],
  controllers: [ProtectedController],
})
export class AppModule {}