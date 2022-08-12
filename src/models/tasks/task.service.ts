import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEntity } from 'src/models/status/status.entity';
import { TaskEntity } from 'src/models/tasks/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(StatusEntity)
    private stateRepository: Repository<StatusEntity>,
  ) {}
  async getAll() {
    return await this.taskRepository.find({ relations: { status: true } });
  }
  async getOne(id: number) {
    return await this.taskRepository.find({
      where: { id },
      relations: { status: true },
    });
  }

  async addOne(taskDetails: {
    title: string;
    userId: number;
  }) {
    const newState = this.stateRepository.create();
    await this.stateRepository.save(newState)
    const newTask = this.taskRepository.create({
      title: taskDetails.title,
      user: taskDetails.userId,
      status: newState.id,
    });
    await this.taskRepository.save(newTask)

    return newTask
  }

  async updateOne(id: number, title: string) {
    return await this.taskRepository.update(id, { title: title });
  }
  async deleteOne(id: number) {
    return await this.taskRepository.delete(id);
  }
}
