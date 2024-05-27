import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Debt, DebtDocument } from './debts.schema';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Injectable()
export class DebtsService {
  constructor(
    @InjectModel(Debt.name) private readonly debtModel: Model<DebtDocument>,
  ) {}

  // async getWeeklySpending(userId: string): Promise<any> {
  //   const debts = await this.debtModel.find({ uid: userId }).exec();

  //   if (!debts.length) {
  //     return [];
  //   }

  //   // Group debts by week and calculate the total amount for each week
  //   const weeklySpending = debts.reduce((acc, debt) => {
  //     const weekKey = this.getWeekKey(new Date(debt.createdAt));
  //     if (!acc[weekKey]) {
  //       acc[weekKey] = {
  //         startDate: this.getStartDateOfWeek(new Date(debt.createdAt)),
  //         endDate: this.getEndDateOfWeek(new Date(debt.createdAt)),
  //         amount: 0,
  //       };
  //     }
  //     acc[weekKey].amount += debt.amount;
  //     return acc;
  //   }, {});

  //   return Object.values(weeklySpending);
  // }

  // private getWeekKey(date: Date): string {
  //   const year = date.getFullYear();
  //   const weekNumber = this.getWeekNumber(date);
  //   return `${year}-W${weekNumber}`;
  // }

  // private getWeekNumber(date: Date): number {
  //   const startOfYear = new Date(date.getFullYear(), 0, 1);
  //   const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
  //   return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  // }

  // private getStartDateOfWeek(date: Date): Date {
  //   const day = date.getDay();
  //   const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  //   const startDate = new Date(date);
  //   startDate.setDate(diff);
  //   startDate.setHours(0, 0, 0, 0);
  //   return startDate;
  // }

  // private getEndDateOfWeek(date: Date): Date {
  //   const start = this.getStartDateOfWeek(date);
  //   const endDate = new Date(start);
  //   endDate.setDate(start.getDate() + 6);
  //   endDate.setHours(23, 59, 59, 999);
  //   return endDate;
  // }

  async create(createDebtDto: CreateDebtDto, userId: string): Promise<Debt> {
    const createdDebt = new this.debtModel({
      ...createDebtDto,
      createdAt: new Date(),
      uid: userId,
    });
    return createdDebt.save();
  }

  async findAll(
    userId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Debt[]> {
    const query: any = { uid: userId };

    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query.createdAt = { $gte: startDate };
    } else if (endDate) {
      query.createdAt = { $lte: endDate };
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
