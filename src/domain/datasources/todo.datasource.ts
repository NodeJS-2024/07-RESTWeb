import { CreateTodoDto, UpdateTodoDto } from '../dtos';
import { TodoEntity } from '../entities/todo.entity';

// 1. Reglas de negocio
export abstract class TodoDataSource {

  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: number): Promise<TodoEntity>;

  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

  abstract deleteById(id: number): Promise<TodoEntity>;

}