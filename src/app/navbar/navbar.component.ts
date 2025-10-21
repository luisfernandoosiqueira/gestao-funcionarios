import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: ['/'] },
    { label: 'Cadastro de Funcionário', icon: 'pi pi-user-plus', routerLink: ['/cadastro'] },
    { label: 'Lista de Funcionários', icon: 'pi pi-list-check', routerLink: ['/lista'] }
  ];
}
