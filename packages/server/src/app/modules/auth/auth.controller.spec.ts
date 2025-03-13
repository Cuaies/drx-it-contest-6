import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './auth.controller';
import { UsersService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.controller';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

const createRandomRegisterPayload = (): RegisterDto => {
  const password = faker.internet.password();
  const confirmPassword = password;

  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    password,
    confirmPassword,
  };
};

const createRandomLoginPayload = (): LoginDto => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe('Auth [Controller]', () => {
  let authController: UsersController;
  let authService: UsersService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<UsersController>(UsersController);
    authService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should call the service with correct parameters', async () => {
      const dto: RegisterDto = createRandomRegisterPayload();
      const response = { statusCode: HttpStatus.CREATED };
      mockAuthService.register.mockResolvedValue(response);

      const result = await authController.register(dto);

      expect(authService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(response);
    });

    it.todo('should throw an error if the service fails');
  });

  describe('login', () => {
    it('should call the service with correct parameters', async () => {
      const dto: LoginDto = createRandomLoginPayload();
      const response = { statusCode: HttpStatus.OK };
      mockAuthService.login.mockResolvedValue(response); // TODO: add response content

      const result = await authController.login(dto);

      expect(authService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual(response);
    });

    it.todo('should throw an error if the service fails');
  });

  describe('logout', () => {
    it.todo('should call the service and return HTTP 200');

    it.todo('should throw an error if the service fails');
  });
});
