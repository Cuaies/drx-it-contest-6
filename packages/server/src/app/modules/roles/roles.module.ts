import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models';
import { UserRole } from '../../../core/relationships';
import { User } from '../auth/models';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
