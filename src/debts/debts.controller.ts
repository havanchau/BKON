import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { DebtsService } from './debts.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { CreateDebtDto } from './dto/create-debt.dto';
import { FilterDebtDto } from './dto/filter-debt.dto';
import { Debt } from './debts.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('debts')
@ApiTags('debts')
@UseGuards(AuthGuard('jwt'))
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Debt,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createDebtDto: CreateDebtDto, @Request() req: any) {
    return this.debtsService.create(createDebtDto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({
    type: Debt,
    isArray: true,
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'minAmount', required: false, type: String })
  async findAll(
    @Query() filterDebtDto: FilterDebtDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const debts = await this.debtsService.findAll(
      filterDebtDto,
      userId,
    );
    return debts;
  }

  @Get(':id')
  @ApiOkResponse({
    type: Debt,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async findOne(@Param('id') id: string, @Request() req: any) {
    const debt = await this.debtsService.findById(id, req.user.userId);
    if (!debt) {
      throw new NotFoundException('Debt not found');
    }
    return debt;
  }

  @Put(':id')
  @ApiOkResponse({
    type: Debt,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateDebtDto: UpdateDebtDto,
    @Request() req: any,
  ) {
    return this.debtsService.update(id, updateDebtDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.debtsService.delete(id, req.user.userId);
  }
}
