import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}api/v1/customers/`);
  }

  getTransactions() {
    // Endpoint para obtener todas las transacciones con información de usuarios
    return this.http.get(`${this.apiUrl}api/v1/transfers/`);
  }

  DoingTransaction(origin: number, target: number, amount: number) {
    const body = {
      origin: origin,
      target: target,
      amount: amount
    };
    return this.http.post(`${this.apiUrl}api/v1/transfers/`, body);
  }
}
