import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { FuncionariosService, Funcionario } from '../service/funcionarios.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, TableModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  loading = false;

  constructor(
    private router: Router,
    private funcionariosService: FuncionariosService
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.funcionariosService.findAll().subscribe({
      next: (lista) => { this.funcionarios = lista; this.loading = false; },
      error: (err) => { this.loading = false; alert(err?.message ?? 'Erro ao consultar API'); }
    });
  }

  visualizar(id: number): void {
    this.router.navigate(['contatodetails', id]);
  }

  editar(id: number): void {
    this.router.navigate(['editar', id]);
  }

  inativar(id: number): void {
    this.funcionariosService.inativar(id).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.message ?? 'Erro ao inativar funcionário')
    });
  }

  excluir(id: number): void {
    this.funcionariosService.delete(id).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.message ?? 'Erro ao excluir funcionário')
    });
  }
}
