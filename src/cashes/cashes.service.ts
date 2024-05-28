// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Cash, CashDocument } from './cashes.schema';
// import { CreateCashDto } from './dto/create-cash.dto';
// import { UpdateCashDto } from './dto/update-cash.dto';

// @Injectable()
// export class CashesService {
//   constructor(
//     @InjectModel(Cash.name) private readonly cashModel: Model<CashDocument>,
//   ) {}

//   async create(createCashDto: CreateCashDto, userId: string): Promise<Cash> {
//     const createdCash = new this.cashModel({
//       ...createCashDto,
//       createdAt: new Date(),
//       uid: userId,
//     });
//     return createdCash.save();
//   }

//   async findAll(userId: string): Promise<Cash[]> {
//     return this.cashModel.find({ uid: userId }).exec();
//   }

//   async findById(id: string, userId: string): Promise<Cash> {
//     const cash = await this.cashModel.findOne({ _id: id, uid: userId }).exec();
//     if (!cash) {
//       throw new NotFoundException('Cash not found');
//     }
//     return cash;
//   }

//   async update(
//     id: string,
//     updateCashDto: UpdateCashDto,
//     userId: string,
//   ): Promise<Cash> {
//     const updatedCash = await this.cashModel
//       .findOneAndUpdate({ _id: id, uid: userId }, updateCashDto, { new: true })
//       .exec();
//     if (!updatedCash) {
//       throw new NotFoundException('Cash not found');
//     }
//     return updatedCash;
//   }

//   async delete(id: string, userId: string): Promise<any> {
//     const result = await this.cashModel
//       .findOneAndDelete({ _id: id, uid: userId })
//       .exec();
//     if (!result) {
//       throw new NotFoundException('Cash not found');
//     }
//     return result;
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cash, CashDocument } from './cashes.schema';
import { Income, IncomeDocument } from '../incomes/incomes.schema';
import { Expense, ExpenseDocument } from '../expenses/expenses.schema';
import { CreateCashDto } from './dto/create-cash.dto';
import { UpdateCashDto } from './dto/update-cash.dto';

@Injectable()
export class CashesService {
  constructor(
    @InjectModel(Cash.name) private readonly cashModel: Model<CashDocument>,
    @InjectModel(Income.name)
    private readonly incomeModel: Model<IncomeDocument>,
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<ExpenseDocument>,
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

  async findById(
    id: string,
    userId: string,
    startDate?: string,
    endDate?: string,
    top: number = 50,
  ): Promise<any> {
    const cash = await this.cashModel.findOne({ _id: id, uid: userId }).exec();
    if (!cash) {
      throw new NotFoundException('Cash not found');
    }

    const query: any = { cashId: id, uid: userId };

    if (startDate) {
      query.createdAt = { $gte: new Date(startDate) };
    }
    if (endDate) {
      query.createdAt = query.createdAt
        ? { ...query.createdAt, $lte: new Date(endDate) }
        : { $lte: new Date(endDate) };
    }

    const expenses = await this.expenseModel.find(query).limit(top).exec();
    const incomes = await this.incomeModel.find(query).limit(top).exec();

    return {
      _id: cash._id,
      name: cash.name,
      balance: cash.balance,
      expenses: expenses.map((expense) => ({
        ...expense.toObject(),
        type: 'expense',
      })),
      incomes: incomes.map((income) => ({
        ...income.toObject(),
        type: 'income',
      })),
    };
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
    const cash = await this.cashModel
      .findOneAndDelete({ _id: id, uid: userId })
      .exec();
    if (!cash) {
      throw new NotFoundException('Cash not found');
    }

    await this.incomeModel.deleteMany({ cashId: id, uid: userId }).exec();
    await this.expenseModel.deleteMany({ cashId: id, uid: userId }).exec();

    return { message: 'Deleted Successfully' };
  }
}
