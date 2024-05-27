import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseExpenseDto {
  @ApiProperty({
    type: String,
    description: 'cashId',
  })
  cashId: string;

  @ApiProperty({
    type: Number,
    description: 'amount',
  })
  amount: number;

  @ApiProperty({
    type: Date,
    description: 'tradedDate',
  })
  tradedDate: Date;

  @ApiProperty({
    type: String,
    description: 'spendOn',
  })
  spendOn: string;

  @ApiPropertyOptional({
    type: String,
    description: 'note',
  })
  note?: string;
}
