import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/user/interface/user.interface';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}
