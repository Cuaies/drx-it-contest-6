import {
  getCreateUserRoleDto,
  getLoginDto,
  getPaginationDto,
  getRegisterDto,
} from '@drx-it-contest-6/core';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { hashPassword } from '../../../core/utils/hash';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import { DBOpsErrorMessages } from '../../../core/messages';
// skipcq: JS-0257
import { Response } from 'express';
import { JWT_AT_COOKIE } from '../../../core/constants';
import { User } from './models';
import { UserRole } from '../../../core/relationships';
import { Role } from '../roles/models';
import { ErrorNamesEnums } from '../../../ts/enums';
import { PaginationService } from '../pagination/pagination.service';

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}
export class CreateUserRoleDto extends getCreateUserRoleDto() {}
export class PaginationDto extends getPaginationDto() {}

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    private paginationService: PaginationService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = hashPassword(registerDto.password);

    try {
      const user = (
        await this.userModel.create({
          ...registerDto,
          passwordHash: hashedPassword,
        })
      )?.dataValues;
      //
      // TODO: assign user role
      //
      const { passwordHash, ...u } = user; // eslint-disable-line
      return u;
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        throw new BadRequestException(DBOpsErrorMessages.UniqueConstraintError);
      }
      throw e;
    }
  }

  async login(response: Response, { email, password }: LoginDto) {
    const user = (await this.userModel.findOne({ where: { email } }))
      ?.dataValues;

    if (!user) {
      throw new BadRequestException();
    }

    const isValidPassword = await compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new BadRequestException();
    }

    const token = await this.signToken(user);
    response.cookie(
      JWT_AT_COOKIE,
      token,
      this.configService.get('auth.jwt_at'),
    );
  }

  /**
   * Generates a JWT token with the given user data payload.
   * @param payload The user data payload to sign. // TODO: add role
   * @returns The signed JWT token.
   */
  private async signToken({ id }: User): Promise<string> {
    const token = await this.jwtService.signAsync(
      { sub: id },
      {
        secret: this.configService.get('auth.jwt_secret'),
        expiresIn: this.configService.get('auth.jwt_expiration'),
      },
    );

    return token;
  }

  logout(response: Response) {
    response.clearCookie(JWT_AT_COOKIE);
  }

  getUsers(paginationDto: PaginationDto) {
    return this.paginationService.paginate(
      paginationDto,
      this.userModel,
      {},
      { include: [Role] },
    );
  }

  getUserRoles(paginationDto: PaginationDto, userId: number) {
    return this.paginationService.paginate(
      paginationDto,
      this.userRoleModel,
      {
        userId,
      },
      {
        include: [Role],
      },
    );
  }

  async setUserRole(userId: number, createUserRoleDto: CreateUserRoleDto) {
    let userRole = await this.userRoleModel
      .create({
        userId,
        ...createUserRoleDto,
      })
      .catch((e) => {
        if (e instanceof Error) {
          if (e.name === ErrorNamesEnums.SequelizeUniqueConstraintError) {
            throw new ConflictException();
          } else if (
            e.name === ErrorNamesEnums.SequelizeForeignKeyConstraintError
          ) {
            throw new BadRequestException();
          }
        }

        throw e;
      });

    if (userRole) {
      userRole = userRole.dataValues;
    }

    return userRole;
  }
}
