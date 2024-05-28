import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Income, IncomeSchema } from './incomes.schema';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { CashesModule } from '../cashes/cashes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
    CashesModule,
  ],
  controllers: [IncomesController],
  providers: [IncomesService],
  exports: [IncomesService, MongooseModule],
})
export class IncomesModule {}
