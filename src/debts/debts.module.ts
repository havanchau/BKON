import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DebtsController } from './debts.controller';
import { Debt, DebtSchema } from './debts.schema';
import { DebtsService } from './debts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Debt.name, schema: DebtSchema }]),
  ],
  controllers: [DebtsController],
  providers: [DebtsService],
  exports: [MongooseModule],
})
export class DebtsModule {}
