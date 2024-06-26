import { ApiProperty } from '@nestjs/swagger';

export class BaseDebtDto {
  @ApiProperty({
    type: Date,
    description: 'borrowDate',
  })
  borrowDate: Date;

  @ApiProperty({
    type: Date,
    description: 'repaidDate',
  })
  repaidDate: Date;

  @ApiProperty({
    type: Number,
    description: 'amount',
  })
  amount: number;

  @ApiProperty({
    type: Number,
    description: 'paid',
  })
  paid: number;

  @ApiProperty({
    type: String,
    description: 'lenderName',
  })
  lenderName: string;

  @ApiProperty({
    type: String,
    description: 'note',
  })
  note?: string;
}
