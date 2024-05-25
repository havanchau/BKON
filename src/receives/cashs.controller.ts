import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CashsService } from './cashs.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCashDto } from './dto/update-cash.dto';
import { CreateCashDto } from './dto/create-cash.dto';
import { Cash } from './cashs.schema';

@Controller('cash')
@ApiTags('cash')
export class CashsController {
  constructor(private readonly cashsService: CashsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Cash,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createCashDto: CreateCashDto) {
    return this.cashsService.create(createCashDto);
  }

  @Get()
  @ApiOkResponse({
    type: Cash,
    isArray: true,
  })
  async findAll() {
    return await this.cashsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Cash,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async findOne(@Param('id') id: string) {
    const cash = await this.cashsService.findById(id);
    if (!cash) {
      throw new NotFoundException('Cash not found');
    }
    return cash;
  }

  @Put(':id')
  @ApiOkResponse({
    type: Cash,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(@Param('id') id: string, @Body() updateCashDto: UpdateCashDto) {
    return this.cashsService.update(id, updateCashDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string) {
    return this.cashsService.delete(id);
  }
}
