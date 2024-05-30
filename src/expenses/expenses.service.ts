import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from './expenses.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { Cash, CashDocument } from '../cashes/cashes.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<ExpenseDocument>,
    @InjectModel(Cash.name) private readonly cashModel: Model<CashDocument>,
  ) {}

  async create(
    createExpenseDto: CreateExpenseDto,
    userId: string,
  ): Promise<Expense> {
    const session = await this.expenseModel.db.startSession();
    session.startTransaction();

    try {
      const createdExpense = new this.expenseModel({
        ...createExpenseDto,
        completeAt: new Date(),
        createdAt: new Date(),
        uid: userId,
      });

      const cash = await this.cashModel.findOneAndUpdate(
        { _id: createExpenseDto.cashId, uid: userId },
        { $inc: { balance: -createExpenseDto.amount } },
        { new: true }
      ).session(session);
      
      if (!cash) {
        throw new Error('Cash document not found');
      }
      

      await createdExpense.save({ session });

      await session.commitTransaction();
      session.endSession();

      return createdExpense;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async findAll(
    filterExpenseDto: FilterExpenseDto,
    userId: string,
  ): Promise<Expense[]> {
    const { startDate, endDate, minAmount } = filterExpenseDto;
    const query: any = { uid: userId };

    if (startDate) {
      query.tradedDate = { ...query.tradedDate, $gte: new Date(startDate) };
    }

    if (endDate) {
      query.tradedDate = { ...query.tradedDate, $lte: new Date(endDate) };
    }

    if (minAmount) {
      query.amount = { ...query.amount, $gte: minAmount };
    }

    return this.expenseModel.find(query).exec();
  }

  async findById(id: string, userId: string): Promise<Expense> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    return this.expenseModel.findOne({ _id: id, uid: userId }).exec();
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
    userId: string,
  ): Promise<Expense> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const updatedExpense = await this.expenseModel
      .findOneAndUpdate({ _id: id, uid: userId }, updateExpenseDto, {
        new: true,
      })
      .exec();
    if (!updatedExpense) {
      throw new NotFoundException('Expense not found');
    }
    return updatedExpense;
  }

  async delete(id: string, userId: string): Promise<any> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const result = await this.expenseModel
      .findOneAndDelete({ _id: id, uid: userId })
      .exec();
    if (!result) {
      throw new NotFoundException('Expense not found');
    }
    return result;
  }

  async getAmountBySpendOn(userId: string): Promise<any> {
    return this.expenseModel.aggregate([
      {
        $match: {
          uid: userId,
        },
      },
      {
        $group: {
          _id: '$spendOn',
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          spendOn: '$_id',
          totalAmount: 1,
        },
      },
    ]);
  }

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
