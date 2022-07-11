import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './user.entity';
import { BadRequestException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PgErrors } from '../../constants/pgErrors';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository');

  async getUsers(filterDto: GetUsersFilterDto) {
    const { search } = filterDto;

    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere('(LOWER(user.title) LIKE LOWER(:search) OR LOWER(user.description) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    try {
      const users = await query.getMany();
      return users;
    } catch (error) {
      this.logger.error(`Failed to get users". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashedPassword;

    const user = this.create(createUserDto);

    try {
      const { password, ...result } = await this.save(user);
      return result;
    } catch (error) {
      if (error.code === PgErrors.UNIQUE_VIOLATION) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

      updateUserDto.password = hashedPassword;
    }

    try {
      const result = await this.createQueryBuilder()
        .update(updateUserDto)
        .where({
          id,
        })
        .returning('*')
        .execute();

      return result.raw[0];
    } catch (error) {
      if (error.code === PgErrors.INVALID_TEXT_REPRESENTATION) {
        throw new BadRequestException('Invalid ID');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
