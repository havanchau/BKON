import { ApiProperty } from '@nestjs/swagger';

export class BaseReceiveDto {
  @ApiProperty({
    type: String,
    description: 'uid',
  })
  uid: string;

  @ApiProperty({
    type: Date,
    description: 'borrowDate',
  })
  borrowDate: Date;

  @ApiProperty({
    type: Date,
    description: 'repaidDate',
  })
  repaidDate: Date;

  @ApiProperty({
    type: Number,
    description: 'amount',
  })
  amount: number;

  @ApiProperty({
    type: String,
    description: 'lenderName',
  })
  lenderName?: string;

  @ApiProperty({
    type: String,
    description: 'note',
  })
  note?: string;
}
