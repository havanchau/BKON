import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceivesController } from './receives.controller';
import { Receive, ReceiveSchema } from './receives.schema';
import { ReceivesService } from './receives.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Receive.name, schema: ReceiveSchema }]),
  ],
  controllers: [ReceivesController],
  providers: [ReceivesService],
})
export class ReceivesModule {}
