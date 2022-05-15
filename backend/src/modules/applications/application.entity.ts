import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'jsonb',
  })
  public properties: unknown;
}
