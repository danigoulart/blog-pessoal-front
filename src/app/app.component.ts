import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',  // caminho do seletor
  templateUrl: './app.component.html', //template
  styleUrls: ['./app.component.css'] // estilo css
})
export class AppComponent {
  title = 'SpaceCatBlog';

  constructor(
    public authService: AuthService

  ){}
}
