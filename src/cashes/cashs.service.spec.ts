import { Test, TestingModule } from '@nestjs/testing';
import { CashsService } from './cashs.service';

describe('CashsService', () => {
  let service: CashsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashsService],
    }).compile();

    service = module.get<CashsService>(CashsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
