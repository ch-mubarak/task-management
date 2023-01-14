import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { User, UserDocument } from 'src/user/schema/user.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = await this.userModel.create({
      name: user.name,
      username: user.username,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(user: CreateUserDto): Promise<User | string> {
    try {
      const myUser = await this.userModel.findOne({
        username: user.username,
      });
      if (!myUser) {
        return 'Invalid credentials';
      }
      const isValid = await bcrypt.compare(user.password, myUser.password);
      if (!isValid) {
        return 'invalid credentials';
      }
      myUser.password = undefined;
      return myUser;
    } catch (error) {
      return 'something went wrong';
    }
  }
}
