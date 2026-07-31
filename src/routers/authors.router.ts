import { Router } from 'express';
import { AuthorController, getAuthor, updateAuthor } from '../controller/authors.controller';

export const authorsRouter = Router();

export function authorRouterBootstrap(authorController: AuthorController) {
  authorsRouter.post('/', authorController.create.bind(authorController));

  authorsRouter.get('/', authorController.list.bind(authorController));
}

authorsRouter.get('/:id', getAuthor);

authorsRouter.put('/:id', updateAuthor);