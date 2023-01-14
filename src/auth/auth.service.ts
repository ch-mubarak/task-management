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

  //   async login(user: UserDocument): Promise<UserDocument | string> {
  //     const myUser = await this.userModel.find({ username: user.username });
  //     if (!myUser) {
  //       return 'User not found';
  //     }
  //     // if
  //   }
}
