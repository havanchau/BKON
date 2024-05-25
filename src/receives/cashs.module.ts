// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Cash, CashSchema } from './cashs.schema';
// import { CashsController } from './cashs.controller';
// import { CashsService } from './cashs.service';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Cash.name, schema: CashSchema }]),
//   ],
//   controllers: [CashsController],
//   providers: [CashsService],
// })
// export class CashsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CashsController } from './cashs.controller';
import { Cash, CashSchema } from './cashs.schema';
import { CashsService } from './cashs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cash.name, schema: CashSchema }]),
  ],
  controllers: [CashsController],
  providers: [CashsService],
  exports: [MongooseModule],
})
export class CashsModule {}
