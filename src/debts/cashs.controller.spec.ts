import { Test, TestingModule } from '@nestjs/testing';
import { CashsController } from './cashs.controller';

describe('CashsController', () => {
  let controller: CashsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashsController],
    }).compile();

    controller = module.get<CashsController>(CashsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
