import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/users/user.entity';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  
  async getAllUsers() {
    return await this.userRepository.find({
      relations: ['tasks', 'tasks.user', 'tasks.status'],
    });
  }
  async getUserById(id: number) {
    return await this.userRepository.find({
      where: { id: id },
      relations: ['tasks', 'tasks.user'],
    });
  }
  async addUser(username: string, password: string) {
    await this.userRepository.insert({
      username: username,
      password: password,
      tasks: [],
    });
    return 'User Created Successfully';
  }

  async updateUser(id: number, user: { username: string; password: string }) {
    return await this.userRepository.update(id, {
      username: user.username,
      password: user.password,
    });
  }
  async DeleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
  async singup(user: { username: string; password: string }) {
    const hashedPassword = await bycrypt.hash(user.password, 12);
    const newUser = this.userRepository.create({
      username: user.username,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async login(user: { username: string; password: string }) {
    const userData = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (!userData) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const passwordIsMatch = await bycrypt.compare(
      user.password,
      userData.password,
    );

    if (!passwordIsMatch) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return "Welcome USER"
  }
}
