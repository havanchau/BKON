import { IsOptional, IsDateString, IsNumber } from 'class-validator';

export class FilterIncomeDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  minAmount?: number;
}
