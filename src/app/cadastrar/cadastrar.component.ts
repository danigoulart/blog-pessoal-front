import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  
  // criando um objeto usuario para receber/referenciar a Model Usuario
  usuario: Usuario = new Usuario
  usuarioLogin: UsuarioLogin = new UsuarioLogin
  confirmarSenha: string
  tipoUsuario: string;


  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {   // responsavel por iniciar a página dando prioridade aos métodos daqui
    window.scroll(0,0)

  }

  confirmSenha(event:any){   //criando evento para receber as senhas
    this.confirmarSenha = event.target.value //chamando o confirmar senha
  }

  cadastrarUsuario() {
    this.usuario.tipo = this.tipoUsuario
    if (this.usuario.senha != this.confirmarSenha ) {
      alert("Suas senhas precisam ser iguais!");
    }
    else { //vai sobrecrever a senha em formato json para o backend receber
      this.authService.Cadastrar(this.usuario).subscribe((resp:Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        alert("Você foi cadastrado com sucesso! Bem vindo!")
      });

    }
  }
    tipoUser(event: any) {
      this.tipoUsuario = event.target.value
    }



}
