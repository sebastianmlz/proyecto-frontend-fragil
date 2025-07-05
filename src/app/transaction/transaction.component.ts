import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-transaction',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  transferForm: FormGroup;
  transferStatus: 'success' | 'error' | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.transferForm = this.fb.group({
      origin: ['', Validators.required],
      target: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }
    const { origin, target, amount } = this.transferForm.value;
    this.apiService.DoingTransaction(origin, target, amount).subscribe({
      next: () => {
        this.transferStatus = 'success';
        this.transferForm.reset();
      },
      error: () => {
        this.transferStatus = 'error';
      }
    });
  }
}
