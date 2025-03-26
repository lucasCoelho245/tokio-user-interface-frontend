import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private readonly apiUrl = 'http://localhost:8080/cep';

  constructor(private http: HttpClient) {}

  getAddressByCep(cep: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${cep}`);
  }
}
