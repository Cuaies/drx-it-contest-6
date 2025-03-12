import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { UserRole } from '../../../core/relationships';
import { Role } from '../roles/models';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    SequelizeModule.forFeature([User, Role, UserRole]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
