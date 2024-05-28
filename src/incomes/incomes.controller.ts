import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { IncomesService } from './incomes.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { CreateIncomeDto } from './dto/create-income.dto';
import { FilterIncomeDto } from './dto/filter-income.dto';
import { Income } from './incomes.schema';
import { AuthGuard } from '@nestjs/passport';
import { AmountBySpendOnDto } from './dto/amount-by-spend-on.dto';

@Controller('incomes')
@ApiTags('incomes')
@UseGuards(AuthGuard('jwt'))
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Get('stats/amount')
  @ApiOkResponse({ type: [AmountBySpendOnDto] })
  async getAmountBySpendOn(@Request() req: any): Promise<AmountBySpendOnDto[]> {
    return this.incomesService.getAmountBySpendOn(req.user.userId);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Income,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createIncomeDto: CreateIncomeDto, @Request() req: any) {
    return this.incomesService.create(createIncomeDto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({
    type: Income,
    isArray: true,
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async findAll(
    @Query() filterIncomeDto: FilterIncomeDto,
    @Request() req: any,
  ): Promise<Income[]> {
    return await this.incomesService.findAll(filterIncomeDto, req.user.userId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: Income,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async findOne(@Param('id') id: string, @Request() req: any) {
    const income = await this.incomesService.findById(id, req.user.userId);
    if (!income) {
      throw new NotFoundException('Income not found');
    }
    return income;
  }

  @Put(':id')
  @ApiOkResponse({
    type: Income,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
    @Request() req: any,
  ) {
    return this.incomesService.update(id, updateIncomeDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.incomesService.delete(id, req.user.userId);
  }
}
