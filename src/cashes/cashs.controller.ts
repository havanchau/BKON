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
  UseGuards,
  Request,
} from '@nestjs/common';
import { UpdateCashDto } from './dto/update-cash.dto';
import { CreateCashDto } from './dto/create-cash.dto';
import { Cash } from './cashs.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('cash')
@ApiTags('cash')
@UseGuards(AuthGuard('jwt'))
export class CashsController {
  constructor(private readonly cashsService: CashsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Cash,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createCashDto: CreateCashDto, @Request() req: any) {
    return this.cashsService.create(createCashDto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({
    type: Cash,
    isArray: true,
  })
  async findAll(@Request() req: any) {
    return await this.cashsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: Cash,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async findOne(@Param('id') id: string, @Request() req: any) {
    const cash = await this.cashsService.findById(id, req.user.userId);
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
  async update(
    @Param('id') id: string,
    @Body() updateCashDto: UpdateCashDto,
    @Request() req: any,
  ) {
    return this.cashsService.update(id, updateCashDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.cashsService.delete(id, req.user.userId);
  }
}
