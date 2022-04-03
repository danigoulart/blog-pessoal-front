import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    /* Sempre que entrar na página inicio, ele vai verificar se o token está vazio.*/
    /* Se o token estiver vazio, vai redicionar o usuário para a HOME/inicio */
    if (environment.token == ''){
      alert("Sua seção expirou! :( Por favor, faça o login novamente para entrar.")
      this.router.navigate(["/home"])
    }
  }

}
