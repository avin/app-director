import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  description: string;

  @Column({ default: true })
  role: string = 'USER';

  @Column({
    type: 'jsonb',
  })
  public properties: unknown;
}
