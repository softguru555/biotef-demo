import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface Sort {
  active: string;
  direction: string;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  constructor(private account: AccountService) {}
  // this.userId = this.route.snapshot.paramMap.get('id') || '';
  users: User[] = [];
  dataSource = new MatTableDataSource<any>([]);
  defaultWebAdminDisplayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'role',
  ];
  pageSizeOptions = [50, 100, 250];
  length = 0;
  pageSize = 5;
  pageIndex = 1;
  // userData:
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    // Get the route parameter
    const data = localStorage.getItem('userInfo');
    console.log('data :>> ', data);
    this.getUsers();
  }
  getUsers(sort?: Sort) {
    var filter = {
      limit: this.pageSize,
      page: this.pageIndex,
    };
    if (sort?.active) {
      Object.assign(filter, sort);
    }
    console.log('filter :>> ', filter);
    this.account.getUserInfo(filter).subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        this.users = response;
        this.dataSource.data = response.userData;
        // this.dataSource.paginator = response.pagination;
        this.length = response.pagination.totalDocument;
      },
      error: (error) => {
        console.log('login failed:', error);
      },
    });
  }
  sortData(event: Sort) {
    this.getUsers(event);
  }
  handlePageEvent(e: PageEvent) {
    console.log('e :>> ', e);
    const filterObject: any = {
      limit: e.pageSize,
      page: e.pageIndex + 1,
      active: 'estimatedReadyDate',
      direction: 'asc',
    };

    // if (this.sortData?.active) filterObject['active'] = this.sortData.active;
    // if (this.sortData?.direction)
    //   filterObject['direction'] = this.sortData.direction;

    this.getUsers(filterObject);
  }
}
