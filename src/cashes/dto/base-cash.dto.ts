import { ApiProperty } from '@nestjs/swagger';

export class BaseCashDto {
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
