import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Receivable, ReceivableDocument } from './receivables.schema';
import { CreateReceivableDto } from './dto/create-receivable.dto';
import { UpdateReceivableDto } from './dto/update-receivables.dto';

@Injectable()
export class ReceivablesService {
  constructor(
    @InjectModel(Receivable.name)
    private readonly receivableModel: Model<ReceivableDocument>,
  ) {}

  async create(
    createReceivableDto: CreateReceivableDto,
    userId: string,
  ): Promise<Receivable> {
    const createdReceivable = new this.receivableModel({
      ...createReceivableDto,
      createdAt: new Date(),
      uid: userId,
    });
    return createdReceivable.save();
  }

  async findAll(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    minAmount?: number,
  ): Promise<Receivable[]> {
    const query: any = { uid: userId };

    if (startDate) {
      query.borrowDate = { $gte: startDate };
    }
    
    if (endDate) {
      query.borrowDate = { $lte: endDate };
    }

    if (minAmount) {
      query.amount = { $gte: minAmount };
    }

    return this.receivableModel.find(query).exec();
  }

  async findById(id: string, userId: string): Promise<Receivable> {
    const receivable = await this.receivableModel
      .findOne({ _id: id, uid: userId })
      .exec();
    if (!receivable) {
      throw new NotFoundException('Receivable not found');
    }
    return receivable;
  }

  async update(
    id: string,
    updateReceivableDto: UpdateReceivableDto,
    userId: string,
  ): Promise<Receivable> {
    const updatedReceivable = await this.receivableModel
      .findOneAndUpdate({ _id: id, uid: userId }, updateReceivableDto, {
        new: true,
      })
      .exec();
    if (!updatedReceivable) {
      throw new NotFoundException('Receivable not found');
    }
    return updatedReceivable;
  }

  async delete(id: string, userId: string): Promise<any> {
    const result = await this.receivableModel
      .findOneAndDelete({ _id: id, uid: userId })
      .exec();
    if (!result) {
      throw new NotFoundException('Receivable not found');
    }
    return result;
  }
}
