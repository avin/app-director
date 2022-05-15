import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
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
            isNullable: false,
          },
          {
            name: 'properties',
            type: 'jsonb',
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
            isNullable: false,
          },
          {
            name: 'alias',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'properties',
            type: 'jsonb',
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
            name: 'full_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'properties',
            type: 'jsonb',
          },
        ],
      }),
      false,
    );

    /** stand_category */
    await queryRunner.createTable(
      new Table({
        name: 'stand_category',
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
            isNullable: false,
          },
          {
            name: 'alias',
            type: 'varchar',
            isNullable: false,
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
            name: 'stand_category_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'application_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'organization_id',
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
            isNullable: false,
          },
          {
            name: 'properties',
            type: 'jsonb',
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
            name: 'stand_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'properties',
            type: 'jsonb',
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
            name: 'inspector_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'checks_count',
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
    await queryRunner.dropTable('stand_category');
    await queryRunner.dropTable('stand');
    await queryRunner.dropTable('inspector');
    await queryRunner.dropTable('check');
  }
}
