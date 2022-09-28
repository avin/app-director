import { MigrationInterface, QueryRunner } from 'typeorm';
import { Application } from '../../modules/applications/Application';

export class AddSomeData1657471757685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /** application */
    const applicationRepository = queryRunner.manager.getRepository(Application);

    await applicationRepository.insert([
      { title: 'ApplicationName1', properties: { foo: 'bar1' } },
      { title: 'ApplicationName2', properties: { foo: 'bar2' } },
      { title: 'ApplicationName3', properties: { foo: 'bar3' } },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from(Application).execute();
  }
}
