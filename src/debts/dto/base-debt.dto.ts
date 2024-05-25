import { ApiProperty } from '@nestjs/swagger';

export class BaseDebtDto {
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'balance',
  })
  balance: number;
}
