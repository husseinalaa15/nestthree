import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusEntity } from './models/status/status.entity';
import { TaskEntity } from './models/tasks/task.entity';
import { UserEntity } from './models/users/user.entity';
import { LoggerMiddleware } from './middlwares/logger.middleware';
import { StatusModule } from './models/status/status.module';
import { TaskModule } from './models/tasks/task.module';
import { UserModule } from './models/users/user.module';

@Module({
  imports: [
    UserModule,
    TaskModule,
    StatusModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'task3Nest',
      synchronize: true,
      entities: [UserEntity, TaskEntity, StatusEntity],
    }),
    ConfigModule.forRoot({
      envFilePath:".env"
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
