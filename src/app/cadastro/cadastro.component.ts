import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';

import { FuncionariosService, Funcionario } from '../service/funcionarios.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, CardModule, DropdownModule, DatePickerModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private funcionarioApi = inject(FuncionariosService);

  id?: number;
  labelSalvar = 'Salvar';

  // form
  nome = '';
  email = '';
  cargo = '';
  salario: number | null = null;

  // DatePicker trabalha com Date; no envio eu converto para dd/MM/aaaa
  dataAdmissao: Date | null = null;
  hoje = new Date();

  ativo = true;

  // cargos fixos (TI)
  cargosTI = [
    { label: 'Desenvolvedor Backend',  value: 'Desenvolvedor Backend' },
    { label: 'Desenvolvedor Frontend', value: 'Desenvolvedor Frontend' },
    { label: 'Analista de Sistemas',   value: 'Analista de Sistemas' },
    { label: 'Engenheiro DevOps',      value: 'Engenheiro DevOps' },
    { label: 'QA (Analista de Testes)', value: 'QA' }
  ];

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.id = Number(param);
      this.labelSalvar = 'Atualizar';
      this.carregarFuncionario(this.id);
    }
  }

  private carregarFuncionario(id: number): void {
    this.funcionarioApi.findById(id).subscribe({
      next: (f: Funcionario) => {
        this.nome = f.nome ?? '';
        this.email = f.email ?? '';
        this.cargo = f.cargo ?? '';
        this.salario = f.salario ?? null;
        this.ativo = f.ativo ?? true;

        // tenta ler o que vier do back em data (ex.: 'yyyy-MM-dd')
        if (f.dataAdmissao) {
          // 1) tenta via Date nativo
          let d = new Date(f.dataAdmissao);
          // 2) fallback simples para 'yyyy-MM-dd'
          if (isNaN(d.getTime()) && f.dataAdmissao.length === 10) {
            const [y, m, dd] = f.dataAdmissao.split('-').map(Number);
            d = new Date(y, (m ?? 1) - 1, dd ?? 1);
          }
          this.dataAdmissao = isNaN(d.getTime()) ? null : d;
        } else {
          this.dataAdmissao = null;
        }
      },
      error: () => {
        alert('Não foi possível carregar o funcionário.');
        this.router.navigate(['/lista']);
      }
    });
  }

  salvar(): void {
    const nome = this.nome.trim();
    const email = this.email.trim();
    const cargo = (this.cargo ?? '').toString().trim();
    const salario = this.salario ?? 0;

    // formata dd/MM/aaaa
    const dataAdmissao = this.dataAdmissao ? this.formatBR(this.dataAdmissao) : '';

    if (!nome || !email || !cargo || !dataAdmissao || salario <= 0) {
      alert('Preencha Nome, E-mail, Cargo, Data de Admissão (dd/mm/aaaa) e Salário (> 0).');
      return;
    }

    const body: Funcionario = { nome, email, cargo, salario, dataAdmissao, ativo: this.ativo };

    const req$ = this.id
      ? this.funcionarioApi.update(this.id, body)
      : this.funcionarioApi.create(body);

    req$.subscribe({
      next: () => { alert('Funcionário salvo com sucesso.'); this.router.navigate(['/lista']); },
      error: () => alert('Erro ao salvar funcionário. Verifique os dados e tente novamente.')
    });
  }

  cancelar(): void { this.router.navigate(['/lista']); }

  
  private formatBR(d: Date): string {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
}
