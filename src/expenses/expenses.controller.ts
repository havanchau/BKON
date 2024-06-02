/* eslint-disable prettier/prettier */
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
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
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { Expense } from './expenses.schema';
import { AuthGuard } from '@nestjs/passport';
import { AmountBySpendOnDto } from './dto/amount-by-spend-on.dto';

@Controller('expenses')
@ApiTags('expenses')
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('stats/amount')
  @ApiOkResponse({ type: [AmountBySpendOnDto] })
  async getAmountBySpendOn(@Request() req: any): Promise<AmountBySpendOnDto[]> {
    return this.expensesService.getAmountBySpendOn(req.user.userId);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Expense,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Request() req: any,
  ) {
    return this.expensesService.create(createExpenseDto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({
    type: Expense,
    isArray: true,
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'minAmount', required: false, type: Number })
  async findAll(
    @Query() filterExpenseDto: FilterExpenseDto,
    @Request() req: any,
  ): Promise<Expense[]> {
    return await this.expensesService.findAll(
      filterExpenseDto,
      req.user.userId,
    );
  }

  @Get(':id')
  @ApiOkResponse({
    type: Expense,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async findOne(@Param('id') id: string, @Request() req: any) {
    const expense = await this.expensesService.findById(id, req.user.userId);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  @Put(':id')
  @ApiOkResponse({
    type: Expense,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Request() req: any,
  ) {
    return this.expensesService.update(id, updateExpenseDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.expensesService.delete(id, req.user.userId);
  }
}
