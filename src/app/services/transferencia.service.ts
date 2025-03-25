import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private apiUrl = 'http://localhost:8080/clients/';

  constructor(private http: HttpClient) {}

  obterTransferencias(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  criarTransferencia(transferencia: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, transferencia);
  }
}
