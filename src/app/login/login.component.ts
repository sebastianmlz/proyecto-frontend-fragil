import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  // Getter para acceso fácil a los campos del formulario
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // Simulación de vulnerabilidad: almacenamiento inseguro de credenciales
    localStorage.setItem('user_credentials', JSON.stringify({
      email: this.f['email'].value,
      password: this.f['password'].value // Vulnerabilidad: almacena contraseña en texto plano
    }));

    // Simulación de inicio de sesión exitoso después de 1 segundo
    setTimeout(() => {
      localStorage.setItem('user_token', 'fake-jwt-token'); // Vulnerabilidad: token sin firma ni expiración
      this.router.navigate(['/home']);
      this.loading = false;
    }, 1000);
  }
}
