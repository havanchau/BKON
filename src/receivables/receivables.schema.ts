import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsPositive } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type ReceivableDocument = HydratedDocument<Receivable>;

@Schema()
export class Receivable {
  @Prop({ required: true })
  @IsString()
  @ApiProperty({ type: String, description: 'uid' })
  uid: string;

  @ApiProperty({ type: Date, description: 'borrowDate' })
  @Prop({ required: true })
  borrowDate: Date;

  @ApiProperty({ type: Date, description: 'repaidDate' })
  @Prop({ required: true })
  repaidDate: Date;

  @Prop({ required: true })
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'amount' })
  amount: number;

  @Prop({ required: true, default: 0 })
  @IsNumber()
  @ApiProperty({ type: Number, description: 'received' })
  received: number;

  @Prop({ required: true })
  @IsString()
  @ApiProperty({ type: String, description: 'lenderName' })
  lenderName: string;

  @ApiProperty({ type: String, description: 'note' })
  @Prop()
  @IsString()
  note?: string;

  @ApiProperty({ type: Date, description: 'createdAt' })
  @Prop({ required: true })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'completeAt' })
  @Prop()
  completeAt?: Date;
}

export const ReceivableSchema = SchemaFactory.createForClass(Receivable);
