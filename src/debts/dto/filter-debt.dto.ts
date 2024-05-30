import { IsOptional, IsDateString, IsNumberString } from 'class-validator';

export class FilterDebtDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumberString()
  minAmount?: Number;
}
