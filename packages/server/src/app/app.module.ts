import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authConfiguration, miscConfiguration } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule, RolesModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [miscConfiguration, authConfiguration] }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: ':memory:',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
// skipcq: JS-0327
export class AppModule {}
