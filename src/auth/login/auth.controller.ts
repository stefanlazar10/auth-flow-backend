import { OTP } from './otp.entity';
import { Public } from './auth.guard';
import { LoginDto } from './login.dto';
import { SignUpDto } from './signUp.dto';
import { OtpDataDto } from './otpData.dto';
import { AuthService } from './auth.service';
import { RecoverPasswordDto } from './recover-pass.dto';
import { SendEmailService } from '../sendEmail/sendEmail.service';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private sendEmailService: SendEmailService) { }


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('recover-password')
  async recoverPass(@Body() recoverPasswordDto: RecoverPasswordDto) {
    recoverPasswordDto.password = this.authService.generatePassword()
    return this.sendEmailService.sendRecoverPass(recoverPasswordDto.email, recoverPasswordDto.password)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('validate-otp')
  async validateOTP(@Body() otpDataDto: OtpDataDto) {
    return this.authService.validateOTP(otpDataDto)

  }


  @Public()
  @Post()
  async createOTP(@Body() otpDataDto: OtpDataDto): Promise<OTP> {
    return this.authService.createOTP(otpDataDto);
  }

}
