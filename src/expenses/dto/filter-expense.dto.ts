import { IsString, IsOptional, IsDateString } from 'class-validator';

export class FilterExpenseDto {
  @IsString()
  uid: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
