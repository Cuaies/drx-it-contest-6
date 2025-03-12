import { getLoginDto, getRegisterDto } from '@drx-it-contest-6/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from '../../../core/utils/hash';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UniqueConstraintError } from 'sequelize';
import { DBOpsErrorMessages } from '../../../core/messages';

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectModel(User)
    private userModel: typeof User,
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
      const { passwordHash, ...u } = user;
      return u;
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        throw new BadRequestException(DBOpsErrorMessages.UniqueConstraintError);
      }
      throw e;
    }
  }

  async login({ email, password }: LoginDto) {
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

  logout() {
    // TODO: implement logout
  }
}
