import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
}
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, MatTableModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  constructor(private route: ActivatedRoute, private account: AccountService) {}
  // this.userId = this.route.snapshot.paramMap.get('id') || '';
  users: User[] = [];
  dataSource = new MatTableDataSource<any>([]);
  defaultWebAdminDisplayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'role',
  ];

  // userData:

  ngOnInit() {
    // Get the route parameter
    const data = localStorage.getItem('userInfo');
    console.log('data :>> ', data);
    this.getUsers();
  }
  getUsers() {
    this.account.getUserInfo().subscribe({
      next: (response) => {
        this.users = response;
        this.dataSource.data = response;
        console.log('this.users :>> ', this.users);
      },
      error: (error) => {
        console.log('login failed:', error);
      },
    });
  }
}
