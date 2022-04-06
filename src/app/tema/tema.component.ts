import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Tema } from '../model/Tema';
import { AlertaService } from '../service/alerta.service';
import { TemaService } from '../service/tema.service';


@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})

export class TemaComponent implements OnInit {

  tema: Tema = new Tema;
  
  listaDeTemas: Tema[];  // referenciando que é uma lista []

  constructor(

    private temaService: TemaService,
    private router: Router,
    private alerta: AlertaService

  ) { }

  ngOnInit(){

    if (environment.token == ''){
      alert("Sua seção expirou! :( Por favor, faça o login novamente para entrar.")
      this.router.navigate(["/home"])
    }

    if(environment.tipo != 'adm'){
     Swal.fire({
      title: 'Apenas administradores podem acessar esta rota!',
      showConfirmButton: false,
      timer: 3000,
      icon: 'info',
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
    this.router.navigate(['/feed'])
    }


    this.findAllTema()
  }

  findAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaDeTemas = resp
    })
  }

  cadastrarTema(){
    this.temaService.postarTema(this.tema).subscribe((resp: Tema) => {

      this.tema = resp
      Swal.fire({
        title: 'Tema cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://i.pinimg.com/originals/c1/96/70/c196703d8852042c026fce79768fbeda.gif")
          left top
          no-repeat
        `
      })
      this.findAllTema();
      this.tema = new Tema;
    })
  }
}
