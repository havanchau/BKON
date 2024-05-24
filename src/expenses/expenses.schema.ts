import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
  @ApiProperty({ type: Date, description: 'createdAt' })
  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  @IsString()
  @ApiProperty({ type: String, description: 'accountId' })
  account: string;

  @ApiProperty({ type: String, description: 'note' })
  @Prop()
  @IsString()
  note?: string;

  @ApiProperty({ type: Date, description: 'createdAt' })
  @Prop()
  completeAt?: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
