import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  // criando um objeto usuario para receber/referenciar a Model Usuario
  usuario: Usuario = new Usuario
  confirmarSenha: string


  constructor(
    private authService: AuthService

  ) { }

  ngOnInit(): void {   // responsavel por iniciar a página dando prioridade aos métodos daqui
  }

  confirmeSenha(event:any){   //criando evento para receber as senhas
    this.confirmarSenha = event.target.value //chamando o confirmar senha
  }

  cadastrarUsuario() {
    if (this.usuario.senha != this.confirmarSenha ) {
      alert("Suas senhas precisam ser iguais!");
    }
    else { //vai sobrecrever a senha em formato json para o backend receber
      this.authService.Cadastrar(this.usuario).subscribe((resp:Usuario) => {
        this.usuario= resp
        alert("Você foi cadastrado com sucesso! Bem vindo!")
      });

    }
  }
}
