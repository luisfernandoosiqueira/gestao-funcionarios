import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { FuncionariosService, Funcionario } from '../service/funcionarios.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    FormsModule,
    ButtonModule, TableModule,
    InputTextModule, DropdownModule
  ],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  loading = false;

  // filtros
  filtroCargo: string | undefined = undefined;
  filtroAtivo?: boolean;

  // opções dos filtros
  opcoesCargo = [
    { label: 'Todos os cargos', value: undefined as unknown as string | undefined },
    { label: 'Desenvolvedor Backend',  value: 'Desenvolvedor Backend' },
    { label: 'Desenvolvedor Frontend', value: 'Desenvolvedor Frontend' },
    { label: 'Analista de Sistemas',   value: 'Analista de Sistemas' },
    { label: 'Engenheiro DevOps',      value: 'Engenheiro DevOps' },
    { label: 'QA',                      value: 'QA' }
  ];

  opcoesAtivo = [
    { label: 'Todos', value: undefined as unknown as boolean | undefined },
    { label: 'Ativos', value: true },
    { label: 'Inativos', value: false }
  ];

  constructor(
    private router: Router,
    private funcionariosService: FuncionariosService
  ) {}

  ngOnInit(): void {
   // this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.funcionariosService.findAll({
      cargo: this.filtroCargo || undefined,
      ativo: this.filtroAtivo
    }).subscribe({
      next: (lista) => { this.funcionarios = lista; this.loading = false; },
      error: (err) => { this.loading = false; alert(err?.message ?? 'Erro ao consultar API'); }
    });
  }

  editar(id: number): void { this.router.navigate(['editar', id]); }

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
