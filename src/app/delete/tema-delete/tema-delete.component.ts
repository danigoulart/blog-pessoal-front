import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertaService } from 'src/app/service/alerta.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  id: number

  constructor(

    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alerta: AlertaService

  ) { }

  ngOnInit(){
    if (environment.token == '') {
      this.router.navigate(['/home'])
  }

 this.id = this.route.snapshot.params['idTema']
  this.findByIdTema(this.id)
}

findByIdTema(id: number) {
  this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
    this.tema = resp
  })
}

apagar() {
  this.temaService.deleteTema(this.id).subscribe(() => {
    
    Swal.fire({
      title: 'Tema apagado com sucesso!',
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
