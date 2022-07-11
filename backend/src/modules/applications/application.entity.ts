import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Stand } from '../stands/stand.entity';

@Entity()
export class Application {
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

  @OneToMany((_type) => Stand, (stand) => stand.application, { eager: false })
  stands: Stand[];
}
