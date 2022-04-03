import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [

  {path:'', redirectTo:'home', pathMatch: 'full'},

  {path:'login', component: LoginComponent},

  {path:'cadastrar', component: CadastrarComponent},

  {path:'home', component: HomeComponent},

  {path: 'feed', component: FeedComponent},

  {path: 'tema', component: TemaComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
