import { getLoginDto, getRegisterDto } from '@drx-it-contest-6/core';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
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

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}

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

  async getUserRoles(userId: number) {
    const user = await this.userModel.findByPk(userId, {
      include: [
        { model: Role, attributes: ['roleName'], through: { attributes: [] } },
      ],
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user.roles;
  }

  async assignRoleToUser(userId: number, roleId: number) {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      throw new NotFoundException();
    }

    await user.$add('roles', role);
  }
}
