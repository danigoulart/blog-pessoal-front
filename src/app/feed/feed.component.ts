import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertaService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {



  postagem: Postagem = new Postagem()
  listaDePostagens: Postagem[]
  tituloPost: string


  tema: Tema = new Tema()
  listaDeTemas: Tema[]
  idTema: number
  descricaoTema: string

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alerta: AlertaService

  ) { }

  ngOnInit() {

    window.scroll(0,0) /* já começa a página no começo */

    /* Sempre que entrar na página inicio, ele vai verificar se o token está vazio.*/
    /* Se o token estiver vazio, vai redicionar o usuário para a HOME/inicio */
    if (environment.token == ''){
      alert("Sua seção expirou! :( Por favor, faça o login novamente para entrar.")
      this.router.navigate(["/home"])
    }
    this.getAllTema()
    this.getAllPostagens()

  }
 getAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaDeTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }


  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaDePostagens = resp
    })
  }

  findByIdUser() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }


  findByTituloPostagem(){

    if(this.tituloPost ==''){
      this.getAllPostagens()

    } else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaDePostagens = resp
      })
    }


  }
  findByDescricaoTema(){

    if (this.descricaoTema == '') {
      this.getAllTema

    } else {
      this.temaService.getByDescricaoTema(this.descricaoTema).subscribe((resp: Tema[]) => {
        this.listaDeTemas = resp
      })
    }
  }


  publicar() {

  this.tema.id = this.idTema
  this.postagem.tema = this.tema

  this.usuario.id = this.idUsuario
  this.postagem.usuario = this.usuario

  this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
    this.postagem = resp

    Swal.fire({
      title: 'Postagem realizada com sucesso!',
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

    this.postagem = new Postagem()
    /* método para buscar todos os temas novamente ao publicar */
    this.getAllPostagens()
  })

}
}
