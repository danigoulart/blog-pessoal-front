import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertaService } from 'src/app/service/alerta.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route : ActivatedRoute,
    private alerta: AlertaService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      /*alert('Sua seção expirou, faça o login novamente!')*/
            this.router.navigate(['/entrar'])
  }
  let idTema = this.route.snapshot.params['idTema']
  this.findByidTema(idTema)
}

findByidTema(idTema: number){
  this.temaService.getByIdTema(idTema).subscribe((resp: Tema) => {
    this.tema = resp
  })
}

atualizar(){
  this.temaService.putTema(this.tema).subscribe((resp: Tema)=>{
    this.tema = resp
    Swal.fire({
      title: 'Tema atualizado com sucesso!',
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
    this.router.navigate(['/tema'])
  })
}

}
