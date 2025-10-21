import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NovoContatoService, Contato } from '../service/novo-contato.service';
import { CardModule} from 'primeng/card';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, CardModule ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  labelNovoContato: string = 'Salvar';
  nome: string = '';
  telefone: string = '';

  constructor(private contatoService: NovoContatoService, private router: Router) {}

  novoContato(): void {
    const nome = this.nome.trim();
    const telefone = this.telefone.trim();
    if (!nome || !telefone) {
      alert('Preencha Nome e Telefone antes de salvar.');
      return;
    }

    const contato: Contato = { nome, telefone };

    this.contatoService.create(contato).subscribe({
      next: (cont) => {
        alert(`Contato salvo com sucesso:
Nome: ${cont.nome}
Telefone: ${cont.telefone}`);
        this.router.navigate(['/listagem']); // redireciona só após salvar
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar contato. Tente novamente.');
      },
    });
  }
}
