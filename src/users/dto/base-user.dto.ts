import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'fullname',
  })
  fullname: string;

  @ApiProperty({
    type: String,
    description: 'username',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;
}
