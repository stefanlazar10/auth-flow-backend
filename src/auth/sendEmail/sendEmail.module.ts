import { Module } from '@nestjs/common';
import { SendEmailService } from './sendEmail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendEmailController } from './sendEmail.controller';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [SendEmailController],
  providers: [SendEmailService, ConfigService]
})
export class SendEmailModule {


}
