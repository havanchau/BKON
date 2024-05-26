import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { CashesService } from './cashes.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UpdateCashDto } from './dto/update-cash.dto';
import { CreateCashDto } from './dto/create-cash.dto';
import { Cash } from './cashes.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('cashes')
@ApiTags('cashes')
@UseGuards(AuthGuard('jwt'))
export class CashesController {
  constructor(private readonly cashesService: CashesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Cash,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createCashDto: CreateCashDto, @Request() req: any) {
    return this.cashesService.create(createCashDto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({
    type: Cash,
    isArray: true,
  })
  async findAll(@Request() req: any) {
    return await this.cashesService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: Cash,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'top', required: false, type: String })
  async findOne(
    @Param('id') id: string,
    @Request() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('top') top?: string,
  ): Promise<any> {
    const topNumber = top ? parseInt(top, 10) : 50;
    return this.cashesService.findById(
      id,
      req.user.userId,
      startDate,
      endDate,
      topNumber,
    );
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
    return this.cashesService.update(id, updateCashDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.cashesService.delete(id, req.user.userId);
  }
}
