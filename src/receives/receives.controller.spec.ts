import { Test, TestingModule } from '@nestjs/testing';
import { ReceivesController } from './receives.controller';

describe('ReceivesController', () => {
  let controller: ReceivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivesController],
    }).compile();

    controller = module.get<ReceivesController>(ReceivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
