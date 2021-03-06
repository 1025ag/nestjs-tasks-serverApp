import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/V1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    };

    getTasksWithFilter(filterDto:GetTasFilterDto):Task[] { 
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if(status) { 
            tasks = tasks.filter(task => task.status == status);
        };
        if(search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.title.includes(search));
        };
        return tasks 
    }

    getTaskById(id: string): Task {
       const found = this.tasks.find(task => task.id == id);
       if(!found){
          throw new NotFoundException(`Task with ${id} not found`);
        } else { 
            return found;
        }
    };

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN

        };
        this.tasks.push(task);
        return task;
    };

    updateTast(id:string, status:TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
     }

    deleteTask(id:string) {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id != found.id);
        const respose = { message:'Task Succesfully deleted', task:found };
        return respose;
    };

};
