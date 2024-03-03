import { Request, Response } from 'express';

const todos = [
  { id: 1, test: 'Buy milk', createdAt: new Date() },
  { id: 2, test: 'Buy bread', createdAt: null },
  { id: 3, test: 'Buy butter', createdAt: new Date() },
];

export class TodoController {

  //* DI => Inyeccion de dependencias
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {

    const id = +req.params.id;

    if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` });

    const todo = todos.find(todo => todo.id === id);

    ( todo )
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with ${ id } not found` });

  }

}