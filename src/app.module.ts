import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendEmailModule } from './auth/sendEmail/sendEmail.module'
import { User } from './auth/register/user.entity';
import { AuthModule } from './auth/login/auth.module'
import { AuthController } from './auth/login/auth.controller';
import { UserRepository } from './auth/register/user.repository';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { typeOrmAsyncConfig } from './config_database/config.service';
import { DataSource } from 'typeorm';
import { APP_FILTER } from '@nestjs/core';
import { UnauthorizedExceptionFilter } from './customExceptionHandler/UnauthorizedExceptionFilter';
import { OTP } from './auth/login/otp.entity';
import { UserModule } from './auth/register/users.module';

@Module({
  imports: [
    SendEmailModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global to access configuration everywhere
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([User, OTP]),
    // TypeOrmModule.forRoot({
    //   entities: [User],
    // })
    // TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
