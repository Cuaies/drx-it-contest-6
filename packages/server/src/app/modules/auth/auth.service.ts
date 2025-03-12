import { getLoginDto, getRegisterDto } from '@drx-it-contest-6/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from '../../../core/utils/hash';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

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

    const token = null; // TODO: generate token
  }

  logout() {
    // TODO: implement logout
  }
}
