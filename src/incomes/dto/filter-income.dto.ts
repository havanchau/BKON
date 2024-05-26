import { IsOptional, IsDateString } from 'class-validator';

export class FilterIncomeDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
