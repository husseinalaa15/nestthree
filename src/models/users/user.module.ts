import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TaskModule } from '../tasks/task.module';
import { TaskService } from 'src/models/tasks/task.service';
import { StatusService } from 'src/models/status/status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/users/user.entity';
import { TaskEntity } from 'src/models/tasks/task.entity';
import { StatusEntity } from 'src/models/status/status.entity';

@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([UserEntity, TaskEntity,StatusEntity])],
  controllers: [UserController],
  providers: [UserService, TaskService, StatusService],
})
export class UserModule {}
