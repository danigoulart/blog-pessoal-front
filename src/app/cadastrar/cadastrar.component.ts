import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertaService } from '../service/alerta.service';
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
    private router: Router,
    private alerta: AlertaService

  ) { }
// NgOninit -> responsavel por iniciar a página dando prioridade aos métodos daqui
  ngOnInit() {
    window.scroll(0,0)

  }

  confirmSenha(event:any){   //criando evento para receber as senhas
    this.confirmarSenha = event.target.value //chamando o confirmar senha
  }

  /* método cadastrar usuário */
  cadastrarUsuario() {
    this.usuario.tipo = this.tipoUsuario
    if (this.usuario.senha != this.confirmarSenha ) {
      /* alerta ao usuario  */
      Swal.fire({
        title: 'Senhas não coincidem!',
        showConfirmButton: false,
        timer: 3000,
        icon: 'info',
        width: 600,
        padding: '3em',
        color: '#f34534',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://c.tenor.com/dNtJSujn-lYAAAAj/run-pikachu.gif")
          left top
          no-repeat
        `
      })
    }


    else { // subscribe vai sobrecrever a senha em formato json para o backend receber
      this.authService.Cadastrar(this.usuario).subscribe((resp:Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])


        Swal.fire({
          title: 'Usuário cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://c.tenor.com/dNtJSujn-lYAAAAj/run-pikachu.gif")
            left top
            no-repeat
          `
        })
      });
    }
  }
    tipoUser(event: any) {
      this.tipoUsuario = event.target.value
    }

}
