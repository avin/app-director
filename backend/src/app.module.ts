import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AuthModule } from './modules/auth/auth.module';
import { StandsModule } from './modules/stands/stands.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { UsersModule } from './modules/users/users.module';
import { FillFakesCommand } from './commands/fill-fakes/fill-fakes.command';
import { User } from './modules/users/user.entity';
import { Application } from './modules/applications/application.entity';
import { Organization } from './modules/organizations/organization.entity';
import { Stand } from './modules/stands/stand.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
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
        logging: true,
        // ...
        entities: [Application, Organization, Stand, User],
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
  ],
  providers: [FillFakesCommand],
})
export class AppModule {}
