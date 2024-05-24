import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cash, CashSchema } from './cashs.schema';
import { CashsController } from './cashs.controller';
import { CashsService } from './cashs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cash.name, schema: CashSchema }]),
  ],
  controllers: [CashsController],
  providers: [CashsService],
})
export class CashsModule {}
