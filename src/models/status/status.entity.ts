import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
export class StatusEntity {

  @PrimaryGeneratedColumn()
  @OneToOne(() => TaskEntity, (TaskEntity) => TaskEntity.status)
  id: number;

  @Column({ default: 'pending'})
  title: string;
}
