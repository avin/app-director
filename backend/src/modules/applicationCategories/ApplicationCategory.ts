import { Column, Entity, OneToMany } from 'typeorm';
import { Stand } from '../stands/Stand';
import { BaseEntity } from '../../utils/types/BaseEntity';
import { Application } from '../applications/Application';

@Entity()
export class ApplicationCategory extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public properties: unknown;

  @OneToMany(
    (_type) => Application,
    (application) => application.applicationCategory,
    { eager: false },
  )
  applications: Stand[];
}
