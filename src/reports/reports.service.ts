import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income, IncomeDocument } from '../incomes/incomes.schema';
import { Expense, ExpenseDocument } from '../expenses/expenses.schema';
import { Debt, DebtDocument } from '../debts/debts.schema';
import {
  Receivable,
  ReceivableDocument,
} from '../receivables/receivables.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
    @InjectModel(Debt.name) private debtModel: Model<DebtDocument>,
    @InjectModel(Receivable.name)
    private receivableModel: Model<ReceivableDocument>,
  ) {}

  private getModel(modelName: string): Model<any> {
    switch (modelName) {
      case 'income':
        return this.incomeModel;
      case 'expense':
        return this.expenseModel;
      case 'debt':
        return this.debtModel;
      case 'receivable':
        return this.receivableModel;
      default:
        throw new Error('Invalid model name');
    }
  }

  async getReport(
    modelName: string,
    userId: string,
    startDate?: Date,
    endDate?: Date,
    frequency: 'week' | 'day' | 'month' = 'week',
  ): Promise<any[]> {
    const model = this.getModel(modelName);
    const query: any = { uid: userId };
    if (startDate) {
      query.createdAt = { $gte: startDate };
    }
    if (endDate) {
      query.createdAt = { ...query.createdAt, $lte: endDate };
    }
    const items = await model.find(query).exec();

    switch (frequency) {
      case 'day':
        return this.calculateDailySpending(items);
      case 'month':
        return this.calculateMonthlySpending(items);
      default:
        return this.calculateWeeklySpending(items);
    }
  }

  private calculateWeeklySpending(items: any[]): any[] {
    if (!items.length) {
      return [];
    }

    const spending = items.reduce((acc, item) => {
      const weekKey = this.getWeekKey(new Date(item.createdAt));
      if (!acc[weekKey]) {
        acc[weekKey] = {
          startDate: this.getStartDateOfWeek(new Date(item.createdAt)),
          endDate: this.getEndDateOfWeek(new Date(item.createdAt)),
          amount: 0,
        };
      }
      acc[weekKey].amount += item.amount;
      return acc;
    }, {});

    return Object.values(spending);
  }

  private calculateDailySpending(items: any[]): any[] {
    if (!items.length) {
      return [];
    }

    const spending = items.reduce((acc, item) => {
      const dateKey = item.createdAt.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: new Date(dateKey),
          amount: 0,
        };
      }
      acc[dateKey].amount += item.amount;
      return acc;
    }, {});

    return Object.values(spending);
  }

  private calculateMonthlySpending(items: any[]): any[] {
    if (!items.length) {
      return [];
    }

    const spending = items.reduce((acc, item) => {
      const monthKey = `${item.createdAt.getFullYear()}-${item.createdAt.getMonth() + 1}`;
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: new Date(
            item.createdAt.getFullYear(),
            item.createdAt.getMonth(),
            1,
          ),
          amount: 0,
        };
      }
      acc[monthKey].amount += item.amount;
      return acc;
    }, {});

    return Object.values(spending);
  }

  private getWeekKey(date: Date): string {
    const year = date.getFullYear();
    const weekNumber = this.getWeekNumber(date);
    return `${year}-W${weekNumber}`;
  }

  private getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  private getStartDateOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startDate = new Date(date);
    startDate.setDate(diff);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
  }

  private getEndDateOfWeek(date: Date): Date {
    const start = this.getStartDateOfWeek(date);
    const endDate = new Date(start);
    endDate.setDate(start.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
    return endDate;
  }
}
