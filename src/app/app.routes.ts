import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';
import { ContatodetailsComponent } from './contatodetails/contatodetails.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'editar/:id', component: CadastroComponent },
  { path: 'listagem', component: ListaComponent },
  { path: 'lista', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'contatodetails/:id', component: ContatodetailsComponent },
  { path: 'detalhes/:id', redirectTo: 'contatodetails/:id', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
