import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login/login.service';
import { RouterModule, Router } from '@angular/router';
import { LocalStorageService } from '../../services/storage/local-storage.service';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  FormGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.localStorage.getItem('userInfo')) {
      this.router.navigate(['/account']);
    }
    this.initForm();
  }

  get email() {
    return this.FormGroup.get('email')!;
  }
  get password() {
    return this.FormGroup.get('password')!;
  }

  initForm() {
    this.FormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn() {
    if (!this.FormGroup.valid) return;
    const email = this.email.value;
    const password = this.password.value;
    console.log('email :>> ', email, password);
    // // encrypt email and password while login
    const encryptedPassword = CryptoJS.AES.encrypt(
      JSON.stringify({ email, password }),
      'biotefCredentials'
    ).toString();
    this.loginService.login({ credentials: encryptedPassword });
  }
  ngOnDestroy() {}
}
