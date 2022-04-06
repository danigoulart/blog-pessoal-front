import { UsuarioLogin } from './../model/UsuarioLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private html:HttpClient) { }



  Entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.html.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin);
  }

  Cadastrar(usuario: Usuario): Observable<Usuario> { //referencia model usuario

    return this.html.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario);
     // <Usuario> maiusculo <- referenciando a model || ->    , usuario minusculo   referencia a váriavel criada
/* Como eu sei se o meu user está logado em minha plataforma? Quando existe um token gerado pelo back-end no meu environment. */
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.html.put<Usuario>('http://localhost:8080/usuarios/atualizar' , usuario)
  }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.html.get<Usuario>(`http://localhost:8080/usuarios/usuarios/${id}`)
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.html.put<Usuario>('http://localhost:8080/usuarios/atualizar', usuario)
  }



  Logado(){
    let ok: boolean = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }

  adm(){
    let ok: boolean = false

    if (environment.tipo == 'adm'){
      ok = true
    }

    return ok
  }

}
