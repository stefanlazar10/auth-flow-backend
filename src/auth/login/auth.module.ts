import { OTP } from './otp.entity';
import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { User } from '../register/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../register/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendEmailModule } from '../sendEmail/sendEmail.module';
import { SendEmailService } from '../sendEmail/sendEmail.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, OTP, OTPRepository]),
    SendEmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: 'WAEGSDGDSGHdsgdfhshjsdjhs',
        }
      },
      inject: [ConfigService],
      global: true,
    }),
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),

  ],
  providers: [
    AuthService,
    UserService,
    JwtService,
    SendEmailService,
    OTPRepository,
    // {
    //   provide: getRepositoryToken(OTP),
    //   inject: [getDataSourceToken()],
    //   useFactory(dataSource: DataSource) {
    //     return dataSource.getRepository(OTP).extend(customOtpRepositoryMethods)
    //   }
    // },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],

  controllers: [AuthController],
  exports: [AuthService, JwtModule, JwtService],
})
export class AuthModule { }