import { MigrationInterface, QueryRunner } from 'typeorm';
import { Application } from '../../modules/applications/application.entity';

export class AddSomeData1657471757685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /** application */
    const applicationRepository = queryRunner.manager.getRepository(Application);

    await applicationRepository.insert([
      { title: 'ApplicationName1', description: 'ApplicationDescription1', properties: { foo: 'bar1' } },
      { title: 'ApplicationName2', description: 'ApplicationDescription2', properties: { foo: 'bar2' } },
      { title: 'ApplicationName3', description: 'ApplicationDescription3', properties: { foo: 'bar3' } },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from(Application).execute();
  }
}
