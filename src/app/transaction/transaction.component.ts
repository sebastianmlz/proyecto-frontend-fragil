import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-transaction',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, TableModule],
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  transferForm: FormGroup;
  transferStatus: 'success' | 'error' | null = null;
  transactions: any[] = [];
  users: any[] = [];
  usuarioLogueado: any = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.transferForm = this.fb.group({
      origin: ['', Validators.required],
      target: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(){
    this.obtenerUsuarioLogueado();
    this.cargarTransacciones();
    this.cargarUsuarios();
  }

  obtenerUsuarioLogueado() {
    const userString = localStorage.getItem('user_credentials');
    if (userString) {
      this.usuarioLogueado = JSON.parse(userString);
      // Auto-completar el campo origin con datos del usuario logueado
      this.transferForm.patchValue({
        origin: 1 // Puedes usar un ID fijo o buscar el ID real del usuario
      });
      console.log('Usuario logueado:', this.usuarioLogueado);
    }
  }

  cargarUsuarios() {
    this.apiService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  onSubmit() {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }
    const { origin, target, amount } = this.transferForm.value;
    
    // Vulnerabilidad: No validar que el usuario tenga fondos suficientes
    // Vulnerabilidad: No validar que el usuario origen sea el usuario logueado
    this.apiService.DoingTransaction(origin, target, amount).subscribe({
      next: () => {
        this.transferStatus = 'success';
        this.transferForm.reset();
        // Recargar transacciones después de una transferencia exitosa
        this.cargarTransacciones();
      },
      error: () => {
        this.transferStatus = 'error';
      }
    });
  }

  cargarTransacciones() {
    this.apiService.getTransactions().subscribe({
      next: (data: any) => {
        // Procesar datos para agregar nombres de usuarios
        this.transactions = this.procesarDatosTransacciones(data);
      },
      error: (error) => {
        console.error('Error al cargar las transacciones:', error);
        // Datos simulados que incluyen transacciones del usuario logueado
        const emailUsuario = this.usuarioLogueado ? this.usuarioLogueado.email : 'usuario@ejemplo.com';
        this.transactions = [
          {
            id: 1,
            origin: 1,
            origin_user: emailUsuario,
            target: 2,
            target_user: 'maria@ejemplo.com',
            amount: 500,
            created_at: new Date(),
            status: 'completed'
          },
          {
            id: 2,
            origin: 2,
            origin_user: 'maria@ejemplo.com',
            target: 1,
            target_user: emailUsuario,
            amount: 250,
            created_at: new Date(),
            status: 'pending'
          },
          {
            id: 3,
            origin: 1,
            origin_user: emailUsuario,
            target: 3,
            target_user: 'carlos@ejemplo.com',
            amount: 150,
            created_at: new Date(),
            status: 'completed'
          }
        ];
      }
    });
  }

  procesarDatosTransacciones(transactions: any[]): any[] {
    // Procesa las transacciones para agregar nombres de usuarios
    const emailUsuario = this.usuarioLogueado ? this.usuarioLogueado.email : 'usuario@ejemplo.com';
    
    return transactions.map(transaction => {
      const originUser = this.users.find(user => user.id === transaction.origin);
      const targetUser = this.users.find(user => user.id === transaction.target);
      
      return {
        ...transaction,
        origin_user: originUser ? originUser.email || originUser.full_name : 
                    (transaction.origin === 1 ? emailUsuario : `Usuario ${transaction.origin}`),
        target_user: targetUser ? targetUser.email || targetUser.full_name : 
                    (transaction.target === 1 ? emailUsuario : `Usuario ${transaction.target}`)
      };
    });
  }
}
