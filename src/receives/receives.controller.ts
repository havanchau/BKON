import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReceivesService } from './receives.service';
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
import { UpdateReceiveDto } from './dto/update-receive.dto';
import { CreateReceiveDto } from './dto/create-receive.dto';
import { Receive } from './receives.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('receives')
@ApiTags('receives')
@UseGuards(AuthGuard('jwt'))
export class ReceivesController {
  constructor(private readonly receivesService: ReceivesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: Receive,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(
    @Body() createReceiveDto: CreateReceiveDto,
    @Request() req: any,
  ) {
    return this.receivesService.create(createReceiveDto, req.user.userId);
  }

  @Get()
  @ApiOkResponse({
    type: Receive,
    isArray: true,
  })
  async findAll(
    @Request() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const userId = req.user.userId;
    const receives = await this.receivesService.findAll(
      userId,
      startDate && new Date(startDate),
      endDate && new Date(endDate),
    );
    return receives;
  }

  @Get(':id')
  @ApiOkResponse({
    type: Receive,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async findOne(@Param('id') id: string, @Request() req: any) {
    const receive = await this.receivesService.findById(id, req.user.userId);
    if (!receive) {
      throw new NotFoundException('Receive not found');
    }
    return receive;
  }

  @Put(':id')
  @ApiOkResponse({
    type: Receive,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateReceiveDto: UpdateReceiveDto,
    @Request() req: any,
  ) {
    return this.receivesService.update(id, updateReceiveDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.receivesService.delete(id, req.user.userId);
  }
}
