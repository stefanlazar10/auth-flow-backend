import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SendEmailService {
    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('SENDGRID_API_KEY')
        sgMail.setApiKey(apiKey)
    }

    async sendOtpEmail(to: string, otp: string): Promise<void> {
        const msg = {
            to: to,
            from: 'lazarstefy1@gmail.com',
            subject: 'Your OTP Code is here',
            text: `Your OTP code is: ${otp}`
        }

        try {
            const response = await sgMail.send(msg);
            console.log('Email sent', response)
        } catch (error) {
            console.error('Error sending email:', error)
        }
    }

    async sendVerificationEmail(to: string): Promise<void> {
        const msg = {
            to: to,
            from: 'lazarstefy1@gmail.com',
            subject: 'Your Verification Link is here',
            text: `Your verification link is www.verificationlink.link`

        }

        try {
            const response = await sgMail.send(msg);
            console.log('Email sent', response)
        } catch (error) {
            console.error("Error sending mail", error)
        }
    }

    async sendRecoverPass(to: string, password: string): Promise<void> {
        const msg = {
            to: to,
            from: 'lazarstefy1@gmail.com',
            subject: 'Your New Password is here',
            text: `Your new password is: ${password}`

        }

        try {
            const response = await sgMail.send(msg);
            console.log('Email sent', response)
        } catch (error) {
            console.error("Error sending mail", error)
        }
    }


}
