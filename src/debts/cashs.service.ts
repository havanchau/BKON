import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cash, CashDocument } from './cashs.schema';
import { Model } from 'mongoose';
import { CreateCashDto } from './dto/create-cash.dto';
import { UpdateCashDto } from './dto/update-cash.dto';

@Injectable()
export class CashsService {
  constructor(
    @InjectModel(Cash.name)
    private readonly cashModel: Model<CashDocument>,
  ) {}

  async findAll() {
    const cashs = await this.cashModel.find({}).lean().exec();
    return cashs;
  }

  async create(createCashDto: CreateCashDto): Promise<Cash> {
    const createdCash = new this.cashModel({
      ...createCashDto,
      createdAt: new Date(),
    });
    return await createdCash.save();
  }

  async findById(id: string): Promise<Cash> {
    const cash = await this.cashModel.findById(id).lean().exec();
    if (!cash) {
      throw new NotFoundException('Cash not found');
    }
    return cash;
  }

  async update(id: string, updateCashDto: UpdateCashDto): Promise<Cash> {
    const existingCash = await this.cashModel
      .findByIdAndUpdate(id, updateCashDto, { new: true })
      .lean()
      .exec();
    if (!existingCash) {
      throw new NotFoundException('Cash not found');
    }
    return existingCash;
  }

  async delete(id: string): Promise<Cash> {
    const deletedCash = await this.cashModel
      .findByIdAndDelete(id)
      .lean()
      .exec();
    if (!deletedCash) {
      throw new NotFoundException('Cash not found');
    }
    return deletedCash;
  }
}
