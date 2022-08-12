import { StatusEntity } from 'src/models/status/status.entity';
import { TaskEntity } from 'src/models/tasks/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { TaskController } from "src/models/tasks/task.controller";
import { StatusService } from "src/models/status/status.service";
import { TaskService } from "src/models/tasks/task.service";
import { StatusModule } from "../status/status.module";


@Module({
    imports:[StatusModule,TypeOrmModule.forFeature([TaskEntity,StatusEntity])],
    controllers:[TaskController],
    providers:[TaskService,StatusService]
})

export class TaskModule{}