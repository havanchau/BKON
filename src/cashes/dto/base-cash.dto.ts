import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseCashDto {
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
