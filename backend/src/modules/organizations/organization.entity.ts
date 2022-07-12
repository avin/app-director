import { Column, Entity, OneToMany } from 'typeorm';
import { Stand } from '../stands/stand.entity';
import { BaseEntity } from '../../utils/base-entity';

@Entity()
export class Organization extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public properties: unknown;

  @OneToMany((_type) => Stand, (stand) => stand.organization, { eager: false })
  stands: Stand[];
}
