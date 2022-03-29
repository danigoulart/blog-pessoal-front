import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private html:HttpClient) { //permitindo métodos http

  }
  /*
  -> Verificar endpoints

  */

  Cadastrar(usuario: Usuario): Observable<Usuario> { //referencia model usuario

    return this.html.post<Usuario>('https://blogdadani.herokuapp.com/usuarios/cadastrar', usuario);
     // <Usuario> maiusculo <- referenciando a model || ->    , usuario minusculo   referencia a váriavel criada

  }
}
