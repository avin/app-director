import { Column, Entity, OneToMany } from 'typeorm';
import { Stand } from '../stands/Stand';
import { BaseEntity } from '../../utils/types/BaseEntity';

@Entity()
export class Organization extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public properties: unknown;

  @OneToMany((_type) => Stand, (stand) => stand.organization, { eager: false })
  stands: Stand[];
}
