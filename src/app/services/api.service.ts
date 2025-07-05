import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.apiUrl}api/v1/customers/`);
  }
}
