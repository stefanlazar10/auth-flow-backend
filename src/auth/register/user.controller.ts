import { User } from './user.entity';
import { UserService } from './user.service';
import { Public } from '../login/auth.guard';
import { CreateUserDto } from './create-user.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';



@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }


  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Public()
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Public()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}

