import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { authConfiguration, miscConfiguration } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [miscConfiguration, authConfiguration] }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
