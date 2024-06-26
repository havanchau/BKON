import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Cash, CashDocument } from '../cashes/cashes.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Cash.name) private readonly cashModel: Model<CashDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return (await this.userModel.find({}, { password: 0 }).exec()) || [];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashPassword,
      createdAt: new Date(),
    });

    const session = await this.userModel.db.startSession();
    session.startTransaction();

    try {
      await createdUser.save({ session });

      const defaultCash = new this.cashModel({
        name: 'Default',
        balance: 0,
        createdAt: new Date(),
        uid: createdUser._id, // Assuming you need to link Cash to User
      });

      await defaultCash.save({ session });

      await session.commitTransaction();
      session.endSession();

      return createdUser;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id, { password: 0 }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.hasOwnProperty('password')) {
      const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
      const existingUser = await this.userModel
        .findByIdAndUpdate(
          id,
          { ...updateUserDto, password: hashPassword },
          { new: true },
        )
        .exec();
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      return existingUser;
    }
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return existingUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }

  async checkUnique(email: string, username: string): Promise<boolean> {
    const isAlivedEmail = await this.userModel.findOne({ email }).exec();
    const isAlivedUsername = await this.userModel.findOne({ username }).exec();

    return !isAlivedEmail && !isAlivedUsername;
  }
}
