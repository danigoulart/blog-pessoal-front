import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertaService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(

    private authService: AuthService,
    private router: Router,
    private alerta: AlertaService

  ) { }

  ngOnInit() {
    window.scroll(0,0);
  }

  entrar(){

    this.authService.Entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {

      this.usuarioLogin = resp;

      environment.token = this.usuarioLogin.token;
      environment.nome = this.usuarioLogin.nome;
      environment.foto = this.usuarioLogin.foto;
      environment.id = this.usuarioLogin.id;
      environment.tipo = this.usuarioLogin.tipo;


      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id)
      // Testar se está recebendo de volta o nome do login
      this.router.navigate(['/feed']);

    }, error =>{

      if(error.status == 401 || error == 500){
        Swal.fire({
          title: 'Usuário ou senha estão incorretos!',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
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
      }
    })
  }
}
