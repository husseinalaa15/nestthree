import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusController } from "src/models/status/status.controller";
import { StatusEntity } from "src/models/status/status.entity";
import { StatusService } from "src/models/status/status.service";
import { TaskModule } from "../tasks/task.module";

@Module({
    imports:[TypeOrmModule.forFeature([StatusEntity])],
    controllers:[StatusController],
    providers:[StatusService]
})

export class StatusModule{}