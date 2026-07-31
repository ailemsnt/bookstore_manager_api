import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import type { Request, Response } from 'express';

import * as authorService from '../service/author.service';
import { AuthorService } from '../service/author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  async create(req: Request, res: Response) {
    const body: unknown = req.body;

    const createAuthorDto = plainToClass(CreateAuthorDto, body);

    await validateOrReject(createAuthorDto);

    const author = await this.authorService.create(createAuthorDto);

    res.status(201).json({
      message: 'Author created successfully',
      data: author,
    });
  }

  async list(req: Request, res: Response) {
    const { nome } = req.query;

    if (nome && typeof nome !== 'string') {
      return res.status(400).json({
        message: 'query param "nome" must be a string',
      });
    }

    const authors = await this.authorService.list({ name: nome });

    res.json(authors);
  }
}

export function getAuthor(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Id is required',
    });
  }

  if (Number.isNaN(Number(id))) {
    return res.status(400).json({
      message: 'Id must be a number',
    });
  }

  const author = authorService.getAuthor(Number(id));

  if (!author) {
    return res.status(404).json({
      message: 'Author not found',
    });
  }

  res.json(author);
}

export function updateAuthor(req: Request, res: Response) {
  const body: unknown = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Id is required',
    });
  }

  if (Number.isNaN(Number(id))) {
    return res.status(400).json({
      message: 'Id must be a number',
    });
  }

  if (!body) {
    return res.status(400).json({
      message: 'Body is required',
    });
  }

  if (typeof body !== 'object') {
    return res.status(400).json({
      message: 'Body must be an object',
    });
  }

  if ('nome' in body && typeof body.nome !== 'string') {
    return res.status(400).json({
      message: 'property "nome" must be a string',
    });
  }

  try {
    const author = authorService.updateAuthor(Number(id), body);

    res.status(201).json({
      message: 'Author updated successfully',
      data: author,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Author not found') {
        return res.status(404).json({
          message: 'Author not found',
        });
      }
    }
    throw error;
  }
}
