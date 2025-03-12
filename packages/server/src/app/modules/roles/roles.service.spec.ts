import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';

describe('Roles [Service]', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });
});
