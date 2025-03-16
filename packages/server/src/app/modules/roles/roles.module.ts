import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models';
import { UserRole } from '../../../core/relationships';
import { User } from '../users/models';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  controllers: [RolesController],
  providers: [RolesService, PaginationService],
})
export class RolesModule {}
