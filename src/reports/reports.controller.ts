import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/report')
@UseGuards(AuthGuard('jwt'))
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('incomes/week')
  async getIncomeWeeklyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'income',
      userId,
      start,
      end,
      'week',
    );
    return { weeklyReport: report };
  }

  @Get('expenses/week')
  async getExpenseWeeklyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'expense',
      userId,
      start,
      end,
      'week',
    );
    return { weeklyReport: report };
  }

  @Get('debts/week')
  async getDebtWeeklyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'debt',
      userId,
      start,
      end,
      'week',
    );
    return { weeklyReport: report };
  }

  @Get('receivables/week')
  async getReceivableWeeklyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'receivable',
      userId,
      start,
      end,
      'week',
    );
    return { weeklyReport: report };
  }

  @Get('incomes/day')
  async getIncomeDailyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'income',
      userId,
      start,
      end,
      'day',
    );
    return { dailyReport: report };
  }

  @Get('expenses/day')
  async getExpenseDailyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'expense',
      userId,
      start,
      end,
      'day',
    );
    return { dailyReport: report };
  }

  @Get('debts/day')
  async getDebtDailyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'debt',
      userId,
      start,
      end,
      'day',
    );
    return { dailyReport: report };
  }

  @Get('receivables/day')
  async getReceivableDailyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'receivable',
      userId,
      start,
      end,
      'day',
    );
    return { dailyReport: report };
  }

  @Get('incomes/month')
  async getIncomeMonthlyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'income',
      userId,
      start,
      end,
      'month',
    );
    return { monthlyReport: report };
  }

  @Get('expenses/month')
  async getExpenseMonthlyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'expense',
      userId,
      start,
      end,
      'month',
    );
    return { monthlyReport: report };
  }

  @Get('debts/month')
  async getDebtMonthlyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'debt',
      userId,
      start,
      end,
      'month',
    );
    return { monthlyReport: report };
  }

  @Get('receivables/month')
  async getReceivableMonthlyReport(
    @Request() req: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const report = await this.reportsService.getReport(
      'receivable',
      userId,
      start,
      end,
      'month',
    );
    return { monthlyReport: report };
  }
}
