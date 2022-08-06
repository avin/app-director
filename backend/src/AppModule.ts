import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ApplicationsModule } from './modules/applications/ApplicationsModule';
import { AuthModule } from './modules/auth/AuthModule';
import { StandsModule } from './modules/stands/StandsModule';
import { OrganizationsModule } from './modules/organizations/OrganizationsModule';
import { UsersModule } from './modules/users/UsersModule';
import { CommandModule } from 'nestjs-command';
import { FakesCommand } from './commands/fill-fakes/FakesCommand';
import { ApplicationCategoriesModule } from './modules/applicationCategories/ApplicationCategoriesModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE || 'dev'}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: configService.get('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
        logging: configService.get('STAGE') === 'dev',
        autoLoadEntities: true,
      }),

      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ApplicationsModule,
    ApplicationCategoriesModule,
    StandsModule,
    OrganizationsModule,
    UsersModule,
    AuthModule,
    CommandModule,
  ],
  providers: [FakesCommand],
})
export class AppModule {}
