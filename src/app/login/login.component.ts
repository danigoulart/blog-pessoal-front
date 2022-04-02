import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
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
    private router: Router

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


      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id)

      // Testar se está recebendo de volta o nome do login

      this.router.navigate(['/feed']);

    }, error =>{

      if(error.status == 401 || error == 500){
        alert("Usuário ou senha estão incorretos! Por favor, tente novamente.")
      }
    })
  }



}
