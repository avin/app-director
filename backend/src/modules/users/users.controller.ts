import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query() filterDto: GetUsersFilterDto) {
    return this.usersService.getUsers(filterDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.logger.verbose(`Creating a new user. Data: ${JSON.stringify(createUserDto)}`);
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
