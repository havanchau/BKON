import { IsOptional, IsDateString, IsNumberString } from 'class-validator';

export class FilterReceivableDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumberString()
  minAmount?: string;
}
