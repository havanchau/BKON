import { ApiProperty } from '@nestjs/swagger';
import { BaseIncomeDto } from './base-income.dto';

export class UpdateIncomeDto extends BaseIncomeDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}
