import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

import { UsersService } from './users.service';
import { UserEntity } from 'src/db/entities/user.entity';

jest.mock('bcrypt', () => ({
  hashSync: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      repository.findOne.mockResolvedValue(null);

      (hashSync as jest.Mock).mockReturnValue('hashed-password');

      repository.save.mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'john@test.com',
        password: 'hashed-password',
      } as UserEntity);

      await expect(
        service.create({
          name: 'John Doe',
          email: 'john@test.com',
          password: '123456',
        }),
      ).resolves.toBeUndefined();

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'john@test.com' },
      });

      expect(hashSync).toHaveBeenCalledWith('123456', 10);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John Doe',
          email: 'john@test.com',
          password: 'hashed-password',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });

    it('should throw ConflictException if user already exists', async () => {
      repository.findOne.mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'john@test.com',
        password: 'hashed-password',
      } as UserEntity);

      await expect(
        service.create({
          name: 'John Doe',
          email: 'john@test.com',
          password: '123456',
        }),
      ).rejects.toThrow(
        new ConflictException('User john@test.com already registered'),
      );

      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should return a user', async () => {
      repository.findOne.mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'john@test.com',
        password: 'hashed-password',
      } as UserEntity);

      const result = await service.findByEmail('john@test.com');

      expect(result).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@test.com',
        password: 'hashed-password',
      });

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'john@test.com' },
      });
    });

    it('should throw HttpException when user is not found and throwResp is true', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findByEmail('john@test.com')).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should return null when user is not found and throwResp is false', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('john@test.com', false);

      expect(result).toBeNull();
    });
  });
});
