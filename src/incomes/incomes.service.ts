import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income, IncomeDocument } from './incomes.schema';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { FilterIncomeDto } from './dto/filter-income.dto';
import { Cash, CashDocument } from '../cashes/cashes.schema';

@Injectable()
export class IncomesService {
  constructor(
    @InjectModel(Income.name)
    private readonly incomeModel: Model<IncomeDocument>,
    @InjectModel(Cash.name) private readonly cashModel: Model<CashDocument>,
  ) {}

  async create(
    createIncomeDto: CreateIncomeDto,
    userId: string,
  ): Promise<Income> {
    const session = await this.incomeModel.db.startSession();
    session.startTransaction();

    try {
      const createdIncome = new this.incomeModel({
        ...createIncomeDto,
        completeAt: new Date(),
        createdAt: new Date(),
        uid: userId,
      });

      const cash = await this.cashModel.findOneAndUpdate(
        { _id: createIncomeDto.cashId, uid: userId },
        { $inc: { balance: +createIncomeDto.amount } },
        { new: true }
      ).session(session);
      
      if (!cash) {
        throw new Error('Cash document not found');
      }

      await createdIncome.save({ session });

      await session.commitTransaction();
      session.endSession();

      return createdIncome;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async findAll(
    filterIncomeDto: FilterIncomeDto,
    userId: string,
  ): Promise<Income[]> {
    const { startDate, endDate } = filterIncomeDto;
    const query: any = { uid: userId };

    if (startDate) {
      query.date = { ...query.date, $gte: new Date(startDate) };
    }

    if (endDate) {
      query.date = { ...query.date, $lte: new Date(endDate) };
    }

    return this.incomeModel.find(query).exec();
  }

  async findById(id: string, userId: string): Promise<Income> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    return this.incomeModel.findOne({ _id: id, uid: userId }).exec();
  }

  async update(
    id: string,
    updateIncomeDto: UpdateIncomeDto,
    userId: string,
  ): Promise<Income> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const updatedIncome = await this.incomeModel
      .findOneAndUpdate({ _id: id, uid: userId }, updateIncomeDto, {
        new: true,
      })
      .exec();
    if (!updatedIncome) {
      throw new NotFoundException('Income not found');
    }
    return updatedIncome;
  }

  async delete(id: string, userId: string): Promise<any> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const result = await this.incomeModel
      .findOneAndDelete({ _id: id, uid: userId })
      .exec();
    if (!result) {
      throw new NotFoundException('Income not found');
    }
    return result;
  }

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
