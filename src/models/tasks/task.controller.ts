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
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/models/tasks/task.entity';
import { TaskService } from 'src/models/tasks/task.service';
import { Repository } from 'typeorm';
@ApiTags("tasks")
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  
  ) {}
  @Get()
  async getAll() {
    return await this.taskService.getAll();
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    return await this.taskService.getOne(userId);
  }
  @Post()
  async addOne(
    @Body() taskDetails: { title: string; userId: number },
  ) {
    return await this.taskService.addOne(taskDetails);
  }

  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() title: string ) {
    return await this.taskService.updateOne(id, title);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) userId: number) {
    return await this.taskService.deleteOne(userId);
  }
}
