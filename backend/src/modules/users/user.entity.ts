import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { Role } from 'common/dist/constants/role';
import { BaseEntity } from '../../utils/types/baseEntity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public properties: unknown;
}
