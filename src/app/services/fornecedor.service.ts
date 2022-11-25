import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApp } from 'app/models/response';
import { Fornecedor } from 'app/models/fornecedor';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService extends DefaultService {
  constructor(private http: HttpClient) {
    super('fornecedor');
  }

  list(): Observable<ResponseApp<Fornecedor[]>> {
    return this.http.get<ResponseApp<Fornecedor[]>>(this.url);
  }

  findById(id: string): Observable<ResponseApp<Fornecedor>> {
    return this.http.get<ResponseApp<Fornecedor>>(`${this.url}/${id}`);
  }

  create(fornecedor: Fornecedor): Observable<ResponseApp<Fornecedor>> {
    return this.http.post<ResponseApp<Fornecedor>>(this.url, fornecedor);
  }

  edit(fornecedor: Fornecedor): Observable<ResponseApp<Fornecedor>> {
    return this.http.put<ResponseApp<Fornecedor>>(`${this.url}/${fornecedor._id}`, fornecedor);
  }

  delete(id: String): Observable<ResponseApp<Fornecedor>> {
    return this.http.delete<ResponseApp<Fornecedor>>(`${this.url}/${id}`);
  }
}
