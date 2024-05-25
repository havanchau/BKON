import { ApiProperty } from '@nestjs/swagger';
import { BaseReceiveDto } from './base-receive.dto';

export class UpdateReceiveDto extends BaseReceiveDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}
