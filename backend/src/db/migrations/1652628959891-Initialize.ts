import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Application } from '../../modules/applications/application.entity';

export class Initialize1652628959891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const commonColumns = [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isUnique: true,
        // generationStrategy: 'uuid',
        default: `uuid_generate_v4()`,
      },
      {
        name: 'createdAt',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updatedAt',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ];

    /** application */
    await queryRunner.createTable(
      new Table({
        name: 'application',
        columns: [
          ...commonColumns,
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'properties',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      false,
    );

    /** organization */
    await queryRunner.createTable(
      new Table({
        name: 'organization',
        columns: [
          ...commonColumns,
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'alias',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'properties',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      false,
    );

    /** user */
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          ...commonColumns,
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'fullName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'properties',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      false,
    );

    /** stand_category */
    await queryRunner.createTable(
      new Table({
        name: 'standCategory',
        columns: [
          ...commonColumns,
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'alias',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'properties',
            type: 'jsonb',
          },
        ],
      }),
      false,
    );

    /** stand */
    await queryRunner.createTable(
      new Table({
        name: 'stand',
        columns: [
          ...commonColumns,
          {
            name: 'standCategoryId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'applicationId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'organizationId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'properties',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      false,
    );

    /** inspector */
    await queryRunner.createTable(
      new Table({
        name: 'inspector',
        columns: [
          ...commonColumns,
          {
            name: 'standId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'properties',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      false,
    );

    /** check */
    await queryRunner.createTable(
      new Table({
        name: 'check',
        columns: [
          ...commonColumns,
          {
            name: 'inspectorId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'checksCount',
            type: 'int4',
            default: 0,
            isNullable: false,
          },
          {
            name: 'result',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'successful',
            type: 'bool',
          },
        ],
      }),
      false,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('application');
    await queryRunner.dropTable('organization');
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('standCategory');
    await queryRunner.dropTable('stand');
    await queryRunner.dropTable('inspector');
    await queryRunner.dropTable('check');
  }
}
