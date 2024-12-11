import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  logOut() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/auth/login']);
  }
}
