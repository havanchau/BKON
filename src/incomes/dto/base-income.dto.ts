import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseIncomeDto {
  @ApiProperty({
    type: String,
    description: 'uid',
  })
  uid: string;

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
