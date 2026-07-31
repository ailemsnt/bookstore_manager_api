import { DeepPartial, Like, Repository } from "typeorm";
import { Autor } from "../model/author.model";

export interface AuthorRepository {
  save(author: Autor): Promise<Autor>;
  merge(author: Autor, data: DeepPartial<Autor>) : void;

  /**
   * ISSO AQUI É GAMBIARRA do professor
   */
  getDriver(): unknown;
}

export class AuthorTypeOrmRepository implements AuthorRepository {
  constructor(private readonly repository: Repository<Autor>) {}

  merge(author: Autor, data: Partial<Autor>): void {
    this.repository.merge(author, data);
  }

  save(author: Autor): Promise<Autor> {
    return this.repository.save(author);
  }

  findAuthorByNome(nome: string): Promise<Autor[]> {
    return this.repository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
    });
  }

  getDriver() {
    return this.repository;
  }
}