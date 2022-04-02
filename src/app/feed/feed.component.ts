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

    if (environment.token == ''){
      alert("Sua seção expirou, faça o login novamente.")
      this.router.navigate(["/home"])
    }
  }

}
