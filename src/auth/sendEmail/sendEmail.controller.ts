import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Public } from '../login/auth.guard';
import { SendEmailService } from './sendEmail.service';

@Controller('otp')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  async sendOtp(@Body() body: { email: string }): Promise<void> {
    const otp = this.generateOtp();
    try {
      await this.sendEmailService.sendOtpEmail(body.email, otp);

      // Handle success
    } catch (error) {
      // Handle error
    }
  }

  private generateOtp(): string {
    return randomBytes(3).toString('hex').toUpperCase();
  }

}
