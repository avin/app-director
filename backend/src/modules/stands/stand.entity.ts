import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from '../applications/application.entity';

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

  @ManyToOne((_type) => Application, (application) => application.stands, { eager: false })
  application: Application;
}
