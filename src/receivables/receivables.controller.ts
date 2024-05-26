import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReceivablesService } from './receivables.service';
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
import { UpdateReceivableDto } from './dto/update-receivables.dto';
import { CreateReceivableDto } from './dto/create-receivable.dto';
import { Receivable } from './receivables.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('receivables')
@ApiTags('receivables')
@UseGuards(AuthGuard('jwt'))
export class ReceivablesController {
  constructor(private readonly receivablesService: ReceivablesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Receivable,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(
    @Body() createReceivableDto: CreateReceivableDto,
    @Request() req: any,
  ) {
    return this.receivablesService.create(createReceivableDto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({
    type: Receivable,
    isArray: true,
  })
  async findAll(
    @Request() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const userId = req.user.userId;
    const receivables = await this.receivablesService.findAll(
      userId,
      startDate && new Date(startDate),
      endDate && new Date(endDate),
    );
    return receivables;
  }

  @Get(':id')
  @ApiOkResponse({
    type: Receivable,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async findOne(@Param('id') id: string, @Request() req: any) {
    const receivable = await this.receivablesService.findById(
      id,
      req.user.userId,
    );
    if (!receivable) {
      throw new NotFoundException('Receivable not found');
    }
    return receivable;
  }

  @Put(':id')
  @ApiOkResponse({
    type: Receivable,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateReceivableDto: UpdateReceivableDto,
    @Request() req: any,
  ) {
    return this.receivablesService.update(
      id,
      updateReceivableDto,
      req.user.userId,
    );
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.receivablesService.delete(id, req.user.userId);
  }
}