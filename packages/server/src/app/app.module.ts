import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  authConfiguration,
  dbConfiguration,
  miscConfiguration,
} from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule, RolesModule, StagesModule } from './modules';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [miscConfiguration, authConfiguration, dbConfiguration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('db'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
    StagesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
// skipcq: JS-0327
export class AppModule {}
