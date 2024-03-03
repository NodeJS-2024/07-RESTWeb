import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

// Prisma esta altamente acomplado en los controllers
export class TodoController {

  //* DI => Inyeccion de dependencias
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  }

  public getTodoById = async (req: Request, res: Response) => {

    const id = +req.params.id;

    if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id
      }
    });

    ( todo )
      ? res.status(200).json(todo)
      : res.status(404).json({ error: `TODO with ${ id } not found` });

  }

  public createTodo = async (req: Request, res: Response) => {

    const { text } = req.body;
    if ( !text ) return res.status(400).json({ error: 'Text property is required' });

    const todo = await prisma.todo.create({
      data: { text: text }
    });

    return res.status(201).json(todo);

  }

  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id;

    if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id
      }
    });

    if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

    const { text, completedAt } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        text, 
        completedAt: (completedAt) ? new Date(completedAt) : null
      }
    });

    return res.status(200).json(updatedTodo);

  }

  public deleteTodo = async (req: Request, res: Response) => {

    const id = +req.params.id;

    if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id
      }
    });

    if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });
    
    const deleted = await prisma.todo.delete({
      where: {
        id: id
      }
    });

    ( deleted )
      ? res.status(200).json(deleted)
      : res.status(400).json({ error: `Todo with id ${ id } not found` });

  }

}