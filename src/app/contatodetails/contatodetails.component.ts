import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NovoContatoService, Contato } from '../service/novo-contato.service';

@Component({
  selector: 'app-contatodetails',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, CardModule],
  templateUrl: './contatodetails.component.html',
  styleUrls: ['./contatodetails.component.scss']
})
export class ContatodetailsComponent implements OnInit {
  
  contato?: Contato;

  constructor(
    private route: ActivatedRoute,
    private contatoApi: NovoContatoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!Number.isNaN(id)) {
      this.contatoApi.findById(id).subscribe({
        next: (contatoBanco) => (this.contato = contatoBanco),
        error: (err) => console.error('Erro ao buscar contato:', err)
      });
    }
  }
}
