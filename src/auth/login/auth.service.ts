
import * as bcrypt from 'bcrypt';
import { OTP } from './otp.entity';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './signUp.dto';
import { OtpDataDto } from './otpData.dto';
import { User } from '../register/user.entity';
import { OTPRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../register/user.repository';
import { SendEmailService } from '../sendEmail/sendEmail.service';
import { Injectable, UnauthorizedException, BadRequestException, ConflictException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    @InjectRepository(OTP)
    @InjectRepository(OtpDataDto)
    private userRepository: UserRepository,
    private otpRepository: OTPRepository,
    private sendEmailService: SendEmailService,
    private jwtService: JwtService,
  ) { }

  async createOTP(otpDataDto: OtpDataDto) {
    const newOTP = this.otpRepository.create(otpDataDto)
    await this.otpRepository.save({
      id: otpDataDto.id,
      otpCode: otpDataDto.otpCode,
      OTPtimestamp: otpDataDto.OTPtimestamp,
    })
    return newOTP;

  }

  async signIn(loginDto: LoginDto): Promise<any> {

    const { email } = loginDto

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');

    }
    var isValid = await bcrypt.compare(loginDto.password, user.password)
    if (!isValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const otpData = this.generateOTP()
    const otpDataDto: OtpDataDto = {
      id: user.id,
      otpCode: otpData.otpCode,
      OTPtimestamp: new Date(otpData.OTPtimestamp)
    }

    await this.otpRepository.save(otpDataDto)

    await this.sendEmailService.sendOtpEmail(loginDto.email, otpDataDto.otpCode)


    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'WAEGSDGDSGHdsgdfhshjsdjhs'
      }),
    };
  }
  private generateOTP() {
    const otpCode = (Math.floor(Math.random() * 899999 + 100000)).toString()
    const OTPtimestamp = Date.now()

    return { otpCode, OTPtimestamp }
  }

  async validateOTP(otpDataDto: OtpDataDto): Promise<boolean> {
    const { otpCode } = otpDataDto
    try {

      const otpData = await this.otpRepository.findOne({ where: { otpCode } })
      if (!otpData) {
        throw new ForbiddenException('Invalid Code')

      }


      const currentTime = Date.now()
      const expiryTime = otpData.OTPtimestamp.getTime() + (2 * 60 * 1000)

      if (otpCode !== otpData.otpCode || currentTime > expiryTime) {
        throw new UnauthorizedException('Incorrect or expired token')
      }
      return true;
    } catch (error) {
      throw error;
    }

  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    signUpDto.id = uuidv4()

    signUpDto.password = await bcrypt.hash(signUpDto.password, 10)

    try {
      await Promise.all([this.userRepository.save(signUpDto),
      this.sendEmailService.sendVerificationEmail(signUpDto.email)])
      return signUpDto;
    }
    catch (error) {
      if (error.message.includes('duplicate key value violates unique constraint')) {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }


  //   async profile(userEmail:string): Promise<User>{
  //       return this.userService.findUserByEmail(userEmail)
  //   }
}