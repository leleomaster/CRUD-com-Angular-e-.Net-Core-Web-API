import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pessoa } from './pessoa';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  url: string = 'https://localhost:7009/api/pessoas';

  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url);
  }

  PegarPessoa(id: number): Observable<Pessoa> {
    var apiUrl = `${this.url}/${id}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  SalvarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  AtualizarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions);
  }

  ExcluirPessoa(id: number): Observable<any> {
    var apiUrl = `${this.url}/${id}`;
    return this.http.delete<Pessoa>(apiUrl);
  }
}
