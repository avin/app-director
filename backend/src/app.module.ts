import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AuthModule } from './modules/auth/auth.module';
import { StandsModule } from './modules/stands/stands.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { UsersModule } from './modules/users/users.module';
import { CommandModule } from 'nestjs-command';
import { FakesCommand } from './commands/fill-fakes/fakes.command';

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
    StandsModule,
    OrganizationsModule,
    UsersModule,
    AuthModule,
    CommandModule,
  ],
  providers: [FakesCommand],
})
export class AppModule {}
