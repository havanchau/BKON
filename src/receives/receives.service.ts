import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Receive, ReceiveDocument } from './receives.schema';
import { CreateReceiveDto } from './dto/create-receive.dto';
import { UpdateReceiveDto } from './dto/update-receive.dto';

@Injectable()
export class ReceivesService {
  constructor(
    @InjectModel(Receive.name)
    private readonly receiveModel: Model<ReceiveDocument>,
  ) {}

  async create(
    createReceiveDto: CreateReceiveDto,
    userId: string,
  ): Promise<Receive> {
    const createdReceive = new this.receiveModel({
      ...createReceiveDto,
      createdAt: new Date(),
      uid: userId,
    });
    return createdReceive.save();
  }

  async findAll(
    userId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Receive[]> {
    const query: any = { uid: userId };

    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query.createdAt = { $gte: startDate };
    } else if (endDate) {
      query.createdAt = { $lte: endDate };
    }

    return this.receiveModel.find(query).exec();
  }

  async findById(id: string, userId: string): Promise<Receive> {
    const receive = await this.receiveModel
      .findOne({ _id: id, uid: userId })
      .exec();
    if (!receive) {
      throw new NotFoundException('Receive not found');
    }
    return receive;
  }

  async update(
    id: string,
    updateReceiveDto: UpdateReceiveDto,
    userId: string,
  ): Promise<Receive> {
    const updatedReceive = await this.receiveModel
      .findOneAndUpdate({ _id: id, uid: userId }, updateReceiveDto, {
        new: true,
      })
      .exec();
    if (!updatedReceive) {
      throw new NotFoundException('Receive not found');
    }
    return updatedReceive;
  }

  async delete(id: string, userId: string): Promise<any> {
    const result = await this.receiveModel
      .findOneAndDelete({ _id: id, uid: userId })
      .exec();
    if (!result) {
      throw new NotFoundException('Receive not found');
    }
    return result;
  }
}
