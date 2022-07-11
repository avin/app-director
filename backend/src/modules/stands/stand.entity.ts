import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from '../applications/application.entity';
import { Organization } from '../organizations/organization.entity';

@Entity()
export class Stand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
