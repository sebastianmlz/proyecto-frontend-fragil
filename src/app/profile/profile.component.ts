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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
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
}
