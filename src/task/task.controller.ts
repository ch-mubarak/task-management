import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schema/task.schema';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async allTasks(): Promise<Task[]> {
    return this.taskService.allTasks();
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.assignTask(task);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
