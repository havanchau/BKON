import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense, ExpenseDocument } from './expenses.schema';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<ExpenseDocument>,
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
    const createdExpense = new this.expenseModel({
      ...createExpenseDto,
      createdAt: new Date(),
    });
    return await createdExpense.save();
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
