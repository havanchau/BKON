import { ApiProperty } from '@nestjs/swagger';
import { BaseReceivableDto } from './base-receivable.dto';

export class UpdateReceivableDto extends BaseReceivableDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}
