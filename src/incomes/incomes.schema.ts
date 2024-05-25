import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type IncomeDocument = HydratedDocument<Income>;

@Schema()
export class Income {
  @Prop({ required: true })
  @IsString()
  @ApiProperty({ type: String, description: 'uid' })
  uid: string;

  @Prop({ required: true })
  @IsString()
  @ApiProperty({ type: String, description: 'cashId' })
  cashId: string;

  @Prop({ required: true })
  @IsNumber()
  @ApiProperty({ type: Number, description: 'amount' })
  amount: number;

  @Prop()
  @IsString()
  @ApiProperty({ type: String, description: 'spendOn' })
  spendOn?: string;

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

export const IncomeSchema = SchemaFactory.createForClass(Income);
