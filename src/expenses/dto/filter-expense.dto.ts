import { IsOptional, IsDateString } from 'class-validator';

export class FilterExpenseDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
