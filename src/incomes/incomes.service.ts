import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income } from './incomes.schema';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { FilterIncomeDto } from './dto/filter-income.dto';

@Injectable()
export class IncomesService {
  constructor(
    @InjectModel(Income.name) private readonly incomeModel: Model<Income>,
  ) {}

  async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
    const createdIncome = new this.incomeModel({
      ...createIncomeDto,
      createdAt: new Date(),
    });
    return createdIncome.save();
  }

  async findAll(filterIncomeDto: FilterIncomeDto): Promise<Income[]> {
    const { uid, startDate, endDate } = filterIncomeDto;
    const query: any = { uid };

    if (startDate) {
      query.date = { ...query.date, $gte: new Date(startDate) };
    }

    if (endDate) {
      query.date = { ...query.date, $lte: new Date(endDate) };
    }

    return this.incomeModel.find(query).exec();
  }

  async findById(id: string): Promise<Income> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    return await this.incomeModel.findById(id).exec();
  }

  async update(id: string, updateIncomeDto: UpdateIncomeDto): Promise<Income> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const updatedIncome = await this.incomeModel
      .findByIdAndUpdate(id, updateIncomeDto, { new: true })
      .exec();
    if (!updatedIncome) {
      throw new NotFoundException('Income not found');
    }
    return updatedIncome;
  }

  async delete(id: string): Promise<any> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const result = await this.incomeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Income not found');
    }
    return result;
  }

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
