import { ApiProperty } from '@nestjs/swagger';

export class AmountBySpendOnDto {
  @ApiProperty({ type: String, description: 'spendOn' })
  spendOn: string;

  @ApiProperty({ type: Number, description: 'totalAmount' })
  totalAmount: number;
}
