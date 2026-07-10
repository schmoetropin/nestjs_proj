// users.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const usersServiceMock = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('saveUser', () => {
    it('should create a user and return 1', async () => {
      const newUser: UserDto = {
        // fill with your DTO fields
        // example:
        // name: 'John',
        // email: 'john@example.com',
      };

      usersServiceMock.create.mockResolvedValue(undefined);

      const result = await controller.saveUser(newUser);

      expect(service.create).toHaveBeenCalledWith(newUser);
      expect(result).toBe(1);
    });
  });
});
