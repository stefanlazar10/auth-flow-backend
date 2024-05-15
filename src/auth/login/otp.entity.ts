import 'reflect-metadata';
import { User } from '../register/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'OtpValidation' })
export class OTP {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    otpCode: string;


    @Column({ nullable: true })
    OTPtimestamp: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id' })
    user: User;
}