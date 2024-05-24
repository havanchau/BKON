import { ApiProperty } from '@nestjs/swagger';
import { BaseCashDto } from './base-cash.dto';

export class UpdateCashDto extends BaseCashDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}
