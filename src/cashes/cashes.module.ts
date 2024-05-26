// // import { Module } from '@nestjs/common';
// // import { MongooseModule } from '@nestjs/mongoose';
// // import { Cash, CasheSchema } from './cashes.schema';
// // import { CashesController } from './cashes.controller';
// // import { CashesService } from './cashes.service';

// // @Module({
// //   imports: [
// //     MongooseModule.forFeature([{ name: Cash.name, schema: CasheSchema }]),
// //   ],
// //   controllers: [CashesController],
// //   providers: [CashesService],
// // })
// // export class CashesModule {}

// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { CashesController } from './cashes.controller';
// import { Cash, CasheSchema } from './cashes.schema';
// import { CashesService } from './cashes.service';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Cash.name, schema: CasheSchema }]),
//   ],
//   controllers: [CashesController],
//   providers: [CashesService],
//   exports: [MongooseModule],
// })
// export class CashesModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CashesService } from './cashes.service';
import { CashesController } from './cashes.controller';
import { Cash, CashSchema } from './cashes.schema';
import { Income, IncomeSchema } from '@/../src/incomes/incomes.schema';
import { Expense, ExpenseSchema } from '@/../src/expenses/expenses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cash.name, schema: CashSchema }]),
    MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
  ],
  controllers: [CashesController],
  providers: [CashesService],
  exports: [MongooseModule],
})
export class CashesModule {}
