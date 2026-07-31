import { Like, Repository } from "typeorm";
import { Autor } from "../model/author.model";
import { AuthorRepository } from "../repositories/autor.repository";
import { CreateAuthorDto } from "../controller/dto/create-author.dto";

export interface Author {
  id: number;
  nome: string;
}

export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async create(authorData: CreateAuthorDto) {
    const newAuthor = new Autor();

    this.authorRepository.merge(newAuthor, authorData);

    const author = await this.authorRepository.save(newAuthor);

    return author;
  }

  list(filter?: { name?: string }): Promise<Autor[]> {
    const { name } = filter ?? {};

    const authorRepository =
      this.authorRepository.getDriver() as Repository<Autor>;

    return authorRepository.find({
      where: {
        nome: name ? Like(`%${name}%`) : undefined,
      },
    });
  }
  
}
  
const authors: Author[] = [];

export function getAuthor(id: number): Author | undefined {
  return authors.find((author) => author.id === id);
}

export function updateAuthor(
  id: number,
  data: Partial<Omit<Author, 'id'>>,
): Author {
  const author = getAuthor(id);

  if (!author) {
    throw new Error('Author not found');
  }

  const { nome } = data;

  if (nome) {
    author.nome = nome;
  }

  return author;
}