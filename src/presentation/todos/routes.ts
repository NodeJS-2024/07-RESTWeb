import { Router } from 'express';
import { TodoController } from './controller';
import { TodoDataSourceImpl } from '../../infrastructure/datasources/todo.datasource';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository';

export class TodoRoutes {

  static get routes(): Router {
    const router = Router();

    // Integrando la Inyeccionde dependecias
    const datasource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);
    const todoController = new TodoController(todoRepository);

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);
    
    router.post('/', todoController.createTodo);
    router.put('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;
  }

}