import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Funcionario {
  id?: number;
  nome: string;
  email: string;
  cargo: string;
  salario: number;        // usando number (Double no back)
  dataAdmissao: string;   // yyyy-MM-dd
  ativo?: boolean;
}

@Injectable({ providedIn: 'root' })
export class FuncionariosService {

  // use a mesma abordagem do modelo (URL absoluta). Se usar proxy, pode trocar por '/api/funcionarios'.
  private readonly apiUrl = 'http://localhost:8080/api/funcionarios';

  constructor(private http: HttpClient) {}

  /** Listagem (com filtros opcionais ?cargo= & ?ativo=) */
  findAll(filtros?: { cargo?: string; ativo?: boolean }): Observable<Funcionario[]> {
    let params = new HttpParams();
    if (filtros?.cargo) params = params.set('cargo', filtros.cargo);
    if (typeof filtros?.ativo === 'boolean') params = params.set('ativo', String(filtros.ativo));
    return this.http
      .get<Funcionario[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }

  findById(id: number): Observable<Funcionario> {
    return this.http
      .get<Funcionario>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(body: Funcionario): Observable<Funcionario> {
    return this.http
      .post<Funcionario>(this.apiUrl, body)
      .pipe(catchError(this.handleError));
  }

  update(id: number, body: Funcionario): Observable<Funcionario> {
    return this.http
      .put<Funcionario>(`${this.apiUrl}/${id}`, body)
      .pipe(catchError(this.handleError));
  }

  /** Inativação (PATCH /{id}/inativar) */
  inativar(id: number): Observable<Funcionario> {
    return this.http
      .patch<Funcionario>(`${this.apiUrl}/${id}/inativar`, {})
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Erro na API de funcionários:', error);
    return throwError(() => new Error('Erro ao consultar a API de funcionários.'));
  }
}
