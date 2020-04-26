import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilter(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        };
    };

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    };

    @Post()
    @UsePipes(ValidationPipe) 
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    };

    @Patch('/:id/status')
    getTaskByIdAndUpdate(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe ) status: TaskStatus
    ): Task {
        return this.tasksService.updateTast(id, status);
    };

    @Delete('/:id')
    getTaskByIdAndRemove(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    };
};
