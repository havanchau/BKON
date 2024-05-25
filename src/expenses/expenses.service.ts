import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense, ExpenseDocument } from './expenses.schema';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { Cash } from '@/../src/cashes/cashs.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<ExpenseDocument>,
    @InjectModel(Cash.name) private readonly cashModel: Model<Cash>,
  ) {}

  async findAll(filterExpenseDto: FilterExpenseDto): Promise<Expense[]> {
    const { uid, startDate, endDate } = filterExpenseDto;

    const filter: any = { uid };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    const incomes = await this.expenseModel.find(filter).lean().exec();
    if (!incomes.length) {
      throw new NotFoundException('No incomes found');
    }
    return incomes;
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const session = await this.expenseModel.db.startSession();
    session.startTransaction();

    try {
      const createdIncome = new this.expenseModel({
        ...createExpenseDto,
        createdAt: new Date(),
        completeAt: new Date(),
      });

      const cash = await this.cashModel
        .findOne({ _id: createExpenseDto.cashId })
        .session(session);

      if (!cash) {
        throw new Error('Cash document not found');
      }

      cash.balance -= createExpenseDto.amount;
      await cash.save({ session });

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

  async findById(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).lean().exec();
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const existingExpense = await this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
      .lean()
      .exec();
    if (!existingExpense) {
      throw new NotFoundException('Expense not found');
    }
    return existingExpense;
  }

  async delete(id: string): Promise<Expense> {
    const deletedExpense = await this.expenseModel
      .findByIdAndDelete(id)
      .lean()
      .exec();
    if (!deletedExpense) {
      throw new NotFoundException('Expense not found');
    }
    return deletedExpense;
  }
}
