import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CashDocument = HydratedDocument<Cash>;

@Schema()
export class Cash {
  @ApiProperty({ type: Date, description: 'createdAt' })
  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  account: string;

  @ApiProperty({ type: Number, description: 'balance' })
  @Prop()
  @IsNumber()
  balance: number;
}

export const CashSchema = SchemaFactory.createForClass(Cash);
