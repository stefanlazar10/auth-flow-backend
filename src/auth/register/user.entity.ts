import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';




@Entity({ name: 'users' })
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // @OneToMany(() => OTP, otp => otp.user)
  // otps: OTP[];
}








