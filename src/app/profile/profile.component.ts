import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TableModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  users: any[] = [];
  usuarioLogueado: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.usuarioLogueado = this.getUsuarioLogueado();
    this.getUsers();
  }

  getUsers() {
    try {
      this.apiService.getUsers().subscribe((data: any) => {
        this.users = data;
        console.log('Usuarios perfil (incluyendo info sensible):', this.users);
      });
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
    }
  }

   getUsuarioLogueado() {
    const userString = localStorage.getItem('user_credentials');
    if (userString) {
      const user = JSON.parse(userString);
      // Cambia esto si tienes un nombre real
      return [{
        id: 1,
        email: user.email,
        password: user.password
      }];
    }
    return [];
  }

}
