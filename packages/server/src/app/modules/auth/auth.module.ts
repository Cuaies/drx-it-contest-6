import { Module } from '@nestjs/common';
import { UsersService } from './auth.service';
import { UsersController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { UserRole } from '../../../core/relationships';
import { Role } from '../roles/models';
import { JwtAtStrategy } from './strategies';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    SequelizeModule.forFeature([User, Role, UserRole]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtAtStrategy],
})
export class UsersModule {}
