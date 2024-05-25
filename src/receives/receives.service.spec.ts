import { Test, TestingModule } from '@nestjs/testing';
import { ReceivesService } from './receives.service';

describe('ReceivesService', () => {
  let service: ReceivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivesService],
    }).compile();

    service = module.get<ReceivesService>(ReceivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
