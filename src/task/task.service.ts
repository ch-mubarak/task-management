import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async assignTask(task: CreateTaskDto): Promise<Task> {
    return await this.taskModel.create(task);
  }

  async allTasks(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async updateTask(id: string, task: CreateTaskDto): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, task);
  }

  async deleteTask(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
