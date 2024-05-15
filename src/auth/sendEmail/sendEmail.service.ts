import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SendEmailService {
    constructor(private configService: ConfigService) {
        // sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'))
        sgMail.setApiKey('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')
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
            text: `Your verification link is www.sexybomba.ro`

        }

        try {
            const response = await sgMail.send(msg);
            console.log('Email sent', response)
        } catch (error) {
            console.error("Error sending mail", error)
        }
    }

    async sendRecoverPass(to: string): Promise<void> {
        const msg = {
            to: to,
            from: 'lazarstefy1@gmail.com',
            subject: 'Your New Password is here',
            text: `Your new password  is wS23kFldSOtye`

        }

        try {
            const response = await sgMail.send(msg);
            console.log('Email sent', response)
        } catch (error) {
            console.error("Error sending mail", error)
        }
    }


}
