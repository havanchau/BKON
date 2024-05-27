import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsService } from './reports.service';
import { IncomesModule } from 'src/incomes/incomes.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { DebtsModule } from 'src/debts/debts.module';
import { ReceivablesModule } from 'src/receivables/receivables.module';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    MongooseModule.forFeature([]),
    IncomesModule,
    ExpensesModule,
    DebtsModule,
    ReceivablesModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
