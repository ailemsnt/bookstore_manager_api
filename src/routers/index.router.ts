import express from 'express';
import { authorRouterBootstrap, authorsRouter } from './authors.router';
import { AuthorController } from '../controller/authors.controller';
import { errorHandlerMiddleware } from '../middlewares/error-handler.middleware';
import { timeLogMiddleware } from '../middlewares/time-log.middleware';

export const rootRouter = express.Router();

// Path variable -> :id
// Query parameter -> ?nome=joao&idade=25

export function routerBootstrap(authorController: AuthorController) {
  authorRouterBootstrap(authorController);
}

// localhost:3000/v1/authors?nome=joao&idade=25
rootRouter.use(
  '/authors',
  timeLogMiddleware,
  authorsRouter,
  errorHandlerMiddleware,
);