import { ApiProperty } from '@nestjs/swagger';
import { BaseExpenseDto } from './base-expense.dto';

export class UpdateExpenseDto extends BaseExpenseDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}
