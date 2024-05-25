import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cash, CashDocument } from './cashs.schema';
import { CreateCashDto } from './dto/create-cash.dto';
import { UpdateCashDto } from './dto/update-cash.dto';

@Injectable()
export class CashsService {
  constructor(
    @InjectModel(Cash.name) private readonly cashModel: Model<CashDocument>,
  ) {}

  async create(createCashDto: CreateCashDto, userId: string): Promise<Cash> {
    const createdCash = new this.cashModel({
      ...createCashDto,
      createdAt: new Date(),
      uid: userId,
    });
    return createdCash.save();
  }

  async findAll(userId: string): Promise<Cash[]> {
    return this.cashModel.find({ uid: userId }).exec();
  }

  async findById(id: string, userId: string): Promise<Cash> {
    const cash = await this.cashModel.findOne({ _id: id, uid: userId }).exec();
    if (!cash) {
      throw new NotFoundException('Cash not found');
    }
    return cash;
  }

  async update(
    id: string,
    updateCashDto: UpdateCashDto,
    userId: string,
  ): Promise<Cash> {
    const updatedCash = await this.cashModel
      .findOneAndUpdate({ _id: id, uid: userId }, updateCashDto, { new: true })
      .exec();
    if (!updatedCash) {
      throw new NotFoundException('Cash not found');
    }
    return updatedCash;
  }

  async delete(id: string, userId: string): Promise<any> {
    const result = await this.cashModel
      .findOneAndDelete({ _id: id, uid: userId })
      .exec();
    if (!result) {
      throw new NotFoundException('Cash not found');
    }
    return result;
  }
}
