import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApp } from 'app/models/response';
import { Produto } from 'app/models/produto';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends DefaultService {
  constructor(private http: HttpClient) {
    super('produto');
  }

  list(): Observable<ResponseApp<Produto[]>> {
    return this.http.get<ResponseApp<Produto[]>>(this.url);
  }

  findById(id: string): Observable<ResponseApp<Produto>> {
    return this.http.get<ResponseApp<Produto>>(`${this.url}/${id}`);
  }

  create(produto: Produto): Observable<ResponseApp<Produto>> {
    return this.http.post<ResponseApp<Produto>>(this.url, produto);
  }

  edit(produto: Produto): Observable<ResponseApp<Produto>> {
    return this.http.put<ResponseApp<Produto>>(`${this.url}/${produto._id}`, produto);
  }

  delete(id: String): Observable<ResponseApp<Produto>> {
    return this.http.delete<ResponseApp<Produto>>(`${this.url}/${id}`);
  }
}
