import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceivablesController } from './receivables.controller';
import { Receivable, ReceivableSchema } from './receivables.schema';
import { ReceivablesService } from './receivables.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Receivable.name,
        schema: ReceivableSchema,
      },
    ]),
  ],
  controllers: [ReceivablesController],
  providers: [ReceivablesService],
  exports: [ReceivablesService, MongooseModule],
})
export class ReceivablesModule {}
