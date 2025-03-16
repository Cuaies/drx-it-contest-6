import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { UserRole } from '../../../core/relationships';
import { Role } from '../roles/models';
import { JwtAtStrategy } from './strategies';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    SequelizeModule.forFeature([User, Role, UserRole]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtAtStrategy, PaginationService],
})
export class UsersModule {}
