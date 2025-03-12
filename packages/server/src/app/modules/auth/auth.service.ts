import { getLoginDto, getRegisterDto } from '@drx-it-contest-6/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from '../../../core/utils/hash';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = hashPassword(registerDto.password);

    try {
      // TODO: create user
      //
      // TODO: assign user role
      //
      // TODO: return sanitized user;
    } catch (e) {
      throw e;
    }
  }

  async login(loginDto: LoginDto) {
    const user = null; // TODO: fetch user from database

    if (!user) {
      throw new BadRequestException();
    }

    const isValidPassword = await compare(loginDto.password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException();
    }

    const token = await this.signToken(user);
  }

  /**
   * Generates a JWT token with the given user data payload.
   * @param payload The user data payload to sign. // TODO: change payload data
   * @returns The signed JWT token.
   */
  private async signToken(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(
      { payload },
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
