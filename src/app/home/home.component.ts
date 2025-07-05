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
  constructor(
    private apiService: ApiService
  ) { }
  users: any[] = [];

  ngOnInit() {
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
}
