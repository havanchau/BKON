import { Test, TestingModule } from '@nestjs/testing';
import { CashesController } from './cashes.controller';

describe('CashesController', () => {
  let controller: CashesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashesController],
    }).compile();

    controller = module.get<CashesController>(CashesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
