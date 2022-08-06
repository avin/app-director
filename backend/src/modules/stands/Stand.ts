import { Column, Entity, ManyToOne } from 'typeorm';
import { Application } from '../applications/Application';
import { Organization } from '../organizations/Organization';
import { BaseEntity } from '../../utils/types/BaseEntity';
import { StandCategory } from '../standCategories/StandCategory';

@Entity()
export class Stand extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  note: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public properties: unknown;

  @Column({ nullable: false })
  applicationId: string;

  @Column({ nullable: true })
  organizationId: string;

  @Column({ nullable: true })
  standCategoryId: string;

  @ManyToOne((_type) => Application, (application) => application.stands, { eager: false })
  application: Application;

  @ManyToOne((_type) => Organization, (organization) => organization.stands, { eager: false })
  organization: Organization;

  @ManyToOne((_type) => StandCategory, (standCategory) => standCategory.stands, { eager: false })
  standCategory: Organization;
}
