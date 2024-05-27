import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CashDocument = HydratedDocument<Cash>;

@Schema()
export class Cash {
  @Prop({ required: true })
  @IsString()
  @ApiProperty({ type: String, description: 'uid' })
  uid: string;

  @Prop({ required: true })
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @ApiProperty({ type: Number, description: 'balance' })
  @Prop()
  @IsNumber()
  balance: number;

  @ApiProperty({ type: Date, description: 'createdAt' })
  @Prop({ required: true })
  createdAt: Date;
}

export const CashSchema = SchemaFactory.createForClass(Cash);
