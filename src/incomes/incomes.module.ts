import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Income, IncomeSchema } from './incomes.schema';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { CashsModule } from '@/../src/cashes/cashs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
    CashsModule,
  ],
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
