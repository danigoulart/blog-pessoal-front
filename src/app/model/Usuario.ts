import { Postagem } from "./Postagem";

export class Usuario{

  public id: number;

  public nome: string;

  public usuario: string;

  public senha: string;

  public foto: string;

  // postagem vai entrar depois quando criar a model de postagem
  public postagem: Postagem[];

}
