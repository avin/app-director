import { Column, Entity, ManyToOne } from 'typeorm';
import { Application } from '../applications/application.entity';
import { Organization } from '../organizations/organization.entity';
import { BaseEntity } from '../../utils/types/baseEntity';

@Entity()
export class Stand extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public properties: unknown;

  @Column({ nullable: false })
  applicationId: string;

  @Column({ nullable: true })
  organizationId: string;

  @ManyToOne((_type) => Application, (application) => application.stands, { eager: false })
  application: Application;

  @ManyToOne((_type) => Organization, (application) => application.stands, { eager: false })
  organization: Organization;
}
