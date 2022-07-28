import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PgErrors } from '../../constants/pgErrors';
import { getEntities } from '../../utils/getEntities';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    public usersRepository: Repository<User>,
  ) {}

  async getUsers(filterDto: GetUsersFilterDto) {
    return getEntities(this.usersRepository, filterDto);
  }

  async getUserById(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid ID');
    }

    const found = await this.usersRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new NotFoundException(`User with not found`);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashedPassword;

    const user = this.usersRepository.create(createUserDto);

    try {
      const { password, ...result } = await this.usersRepository.save(user);
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
    const updateUserData = { ...updateUserDto };
    if (updateUserData.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserData.password, salt);

      updateUserData.password = hashedPassword;
    }

    await this.usersRepository.update(id, updateUserData);
    const updatedPost = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new BadRequestException('Invalid ID');
  }

  async deleteUser(id: string) {
    const result = await this.usersRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async deleteAllUsers() {
    await this.usersRepository.delete({});
  }
}
