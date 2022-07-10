import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  role: string = 'USER';

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public properties: unknown;
}
