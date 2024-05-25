import { ApiProperty } from '@nestjs/swagger';
import { BaseDebtDto } from './base-debt.dto';

export class UpdateDebtDto extends BaseDebtDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}
