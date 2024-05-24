import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseExpenseDto {
  @ApiProperty({
    type: String,
    description: 'account',
  })
  account: string;

  @ApiPropertyOptional({
    type: String,
    description: 'note',
  })
  note?: string;
}
