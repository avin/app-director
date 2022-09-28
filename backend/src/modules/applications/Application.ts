import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Stand } from '../stands/Stand';
import { BaseEntity } from '../../utils/types/BaseEntity';
import { ApplicationCategory } from '../applicationCategories/ApplicationCategory';

@Entity()
export class Application extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public properties: unknown;

  @OneToMany((_type) => Stand, (stand) => stand.application, { eager: false })
  stands: Stand[];

  @Column({ nullable: true })
  applicationCategoryId: string;

  @ManyToOne((_type) => ApplicationCategory, (applicationCategory) => applicationCategory.applications, {
    eager: false,
  })
  applicationCategory: ApplicationCategory[];
}
