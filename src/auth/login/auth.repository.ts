import { OTP } from './otp.entity';
import { OtpDataDto } from './otpData.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class OTPRepository extends Repository<OTP>{
    constructor(private dataSource: DataSource) {
        super(OTP, dataSource.createEntityManager());
    }

    async createOTP({ id, otpCode, OTPtimestamp }: OtpDataDto): Promise<OTP> {
        const otp = this.create({
            id, otpCode, OTPtimestamp
        })
        await this.save(otp)
        return otp
    }
}


