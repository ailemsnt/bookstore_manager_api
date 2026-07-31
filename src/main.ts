import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';

import { UsuarioPostgresRepository } from './infra/repositories/adapters/usuario-postgres.repository';
import { RelatorioPostgresRepository } from './infra/repositories/adapters/relatorio-postgres.pository';
import { AutorPostgresRepository } from './infra/repositories/adapters/autor-postgres.repository';
import { LivroPostgresRepository } from './infra/repositories/adapters/livro-postgres.repository';
import { ClientePostgresRepository } from './infra/repositories/adapters/cliente-postgres.repository';
import { EmprestimoPostgresRepository } from './infra/repositories/adapters/emprestimo-postgres.repository';
import { MunicipioPostgresRepository } from './infra/repositories/adapters/municipio-postgres.repository';
import { LoginService } from './services/login.service';
import { AuthorService } from './service/author.service';
import { BookService } from './services/book.service';
import { CustomerService } from './services/customer.service';
import { BorrowService } from './services/borrow.service';
import { MunicipalityService } from './services/municipality.service';
import { ReportService } from './services/report.service';
import { ReportView } from './view/report.view';
import { BorrowView } from './view/borrow.view';
import { BookView } from './view/book.view';
import { MainView } from './view/main.view';
import { AuthorView } from './view/author.view';
import { CustomerView } from './view/customer.view';
import { AppDataSource, initDatabase } from './infra/database/database';
import { Autor } from './model/author.model';
import { AuthorTypeOrmRepository } from './repositories/autor.repository';
import { AuthorController } from './controller/authors.controller';
import { rootRouter, routerBootstrap } from './routers/index.router';

async function main() {
  const app = express();

  await initDatabase();

  const authorRepository = new AuthorTypeOrmRepository(AppDataSource.getRepository(Autor));
  const authorService = new AuthorService(authorRepository);
  const authorController = new AuthorController(authorService);

  routerBootstrap(authorController);

  const port = process.env.PORT ?? 3000;
  app.use(express.json({limit: '50mb'}));
  app.use('/v1', rootRouter);

  app.listen(port, () => {
    console.log(`Listening on port ${port.toString()}`);
  });
}

main().catch(console.error);