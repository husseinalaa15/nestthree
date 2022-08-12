import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("users")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }
  @Post()
  async addUser(@Body() user: { username: string; password: string }) {
    return await this.userService.addUser(user.username, user.password);
  }
  @Put(':id')
  async updateUser(
    @Param('id',ParseIntPipe) id: number,
    @Body() user: { username: string; password: string },
  ) {
    return await this.userService.updateUser(id, user);
  }
  @Delete(':id')
  async DeleteUser(@Param('id',ParseIntPipe) id: number) {
    return await this.userService.DeleteUser(id);
  }
}
