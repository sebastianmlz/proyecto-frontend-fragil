import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: any[] = [];
  usuarioLogueado: any[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.usuarioLogueado = this.getUsuarioLogueado();
    this.getCustomers();
  }

  getCustomers() {
    try {
      this.apiService.getUsers().subscribe((data: any) => {
        this.users = data;
        console.log('Users fetched successfully:', this.users);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  getUsuarioLogueado() {
    const userString = localStorage.getItem('user_credentials');
    if (userString) {
      const user = JSON.parse(userString);
      // Cambia esto si tienes un nombre real
      return [{
        id: 1,
        full_name: user.email,
        email: user.email
      }];
    }
    return [];
  }
}
