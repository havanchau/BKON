import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type DebtDocument = HydratedDocument<Debt>;

@Schema()
export class Debt {
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
  @ApiProperty({ type: Number, description: 'amount' })
  amount: number;

  @Prop({ required: true })
  @IsNumber()
  @ApiProperty({ type: Number, description: 'paid' })
  paid: number;

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

export const DebtSchema = SchemaFactory.createForClass(Debt);
