import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Debt, DebtDocument } from './debts.schema';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { FilterDebtDto } from './dto/filter-debt.dto';

@Injectable()
export class DebtsService {
  constructor(
    @InjectModel(Debt.name) private readonly debtModel: Model<DebtDocument>,
  ) {}

  async create(createDebtDto: CreateDebtDto, userId: string): Promise<Debt> {
    const createdDebt = new this.debtModel({
      ...createDebtDto,
      createdAt: new Date(),
      uid: userId,
    });
    return createdDebt.save();
  }

  async findAll(
    filterDebtDto: FilterDebtDto,
    userId: string,
  ): Promise<Debt[]> {
    const { startDate, endDate, minAmount } = filterDebtDto;
    const query: any = { uid: userId };

    if (startDate) {
      query.createdAt = { $gte: startDate };
    }
    
    if (endDate) {
      query.createdAt = { $lte: endDate };
    }

    if (minAmount) {
      query.amount = { $gte: minAmount };
    }

    return this.debtModel.find(query).exec();
  }

  async findById(id: string, userId: string): Promise<Debt> {
    const debt = await this.debtModel.findOne({ _id: id, uid: userId }).exec();
    if (!debt) {
      throw new NotFoundException('Debt not found');
    }
    return debt;
  }

  async update(
    id: string,
    updateDebtDto: UpdateDebtDto,
    userId: string,
  ): Promise<Debt> {
    const updatedDebt = await this.debtModel
      .findOneAndUpdate({ _id: id, uid: userId }, updateDebtDto, { new: true })
      .exec();
    if (!updatedDebt) {
      throw new NotFoundException('Debt not found');
    }
    return updatedDebt;
  }

  async delete(id: string, userId: string): Promise<any> {
    const result = await this.debtModel
      .findOneAndDelete({ _id: id, uid: userId })
      .exec();
    if (!result) {
      throw new NotFoundException('Debt not found');
    }
    return result;
  }
}
