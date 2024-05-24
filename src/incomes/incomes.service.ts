// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Income, IncomeDocument } from './incomes.schema';
// import { Model } from 'mongoose';
// import { CreateIncomeDto } from './dto/create-income.dto';
// import { UpdateIncomeDto } from './dto/update-income.dto';
// import { FilterIncomeDto } from './dto/filter-income.dto';

// @Injectable()
// export class IncomesService {
//   constructor(
//     @InjectModel(Income.name)
//     private readonly incomeModel: Model<IncomeDocument>,
//   ) {}

//   async findAll(filterIncomeDto: FilterIncomeDto): Promise<Income[]> {
//     const { uid, startDate, endDate } = filterIncomeDto;

//     const filter: any = { uid };

//     if (startDate || endDate) {
//       filter.createdAt = {};
//       if (startDate) {
//         filter.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         filter.createdAt.$lte = new Date(endDate);
//       }
//     }

//     const incomes = await this.incomeModel.find(filter).lean().exec();
//     if (!incomes.length) {
//       throw new NotFoundException('No incomes found');
//     }
//     return incomes;
//   }

//   async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
//     const createdIncome = new this.incomeModel({
//       ...createIncomeDto,
//       createdAt: new Date(),
//     });
//     return await createdIncome.save();
//   }

//   async findById(id: string): Promise<Income> {
//     const income = await this.incomeModel.findById(id).lean().exec();
//     if (!income) {
//       throw new NotFoundException('Income not found');
//     }
//     return income;
//   }

//   async update(id: string, updateIncomeDto: UpdateIncomeDto): Promise<Income> {
//     const existingIncome = await this.incomeModel
//       .findByIdAndUpdate(id, updateIncomeDto, { new: true })
//       .lean()
//       .exec();
//     if (!existingIncome) {
//       throw new NotFoundException('Income not found');
//     }
//     return existingIncome;
//   }

//   async delete(id: string): Promise<Income> {
//     const deletedIncome = await this.incomeModel
//       .findByIdAndDelete(id)
//       .lean()
//       .exec();
//     if (!deletedIncome) {
//       throw new NotFoundException('Income not found');
//     }
//     return deletedIncome;
//   }

//   async getIncomeReport(uid: string, startDate: Date, endDate: Date) {
//     const matchStage = {
//       $match: {
//         uid,
//         date: {
//           $gte: startDate,
//           $lte: endDate,
//         },
//       },
//     };

//     const groupStage = {
//       $group: {
//         _id: { day: { $dayOfWeek: '$date' }, category: '$category' },
//         totalAmount: { $sum: '$amount' },
//       },
//     };

//     const projectStage = {
//       $project: {
//         day: '$_id.day',
//         category: '$_id.category',
//         totalAmount: 1,
//         _id: 0,
//       },
//     };

//     const sortStage = {
//       $sort: {
//         day: 1 as 1 | -1,
//       },
//     };

//     const report = await this.incomeModel
//       .aggregate([matchStage, groupStage, projectStage, sortStage])
//       .exec();

//     return report;
//   }
// }

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
    return this.incomeModel.findById(id).exec();
  }

  async update(id: string, updateIncomeDto: UpdateIncomeDto): Promise<Income> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const updatedIncome = await this.incomeModel.findByIdAndUpdate(id, updateIncomeDto, { new: true }).exec();
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
