import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) { }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }
  // async findUserByEmail(email: string): Promise<User | undefined> {
  //   return this.userRepository.findByEmail(email);
  // }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto)
    await this.userRepository.save({
      id: createUserDto.id,
      email: createUserDto.email,
      password: createUserDto.password,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname
    })
    return newUser;

  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }


}
