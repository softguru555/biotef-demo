import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../services/storage/local-storage.service';
import { LoginService } from '../services/login/login.service';
import { User } from '../models/User';
@Component({
  selector: 'app-template',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent implements OnInit {
  user?: User | null | undefined;
  constructor(private router: Router, private loginService: LoginService) {}
  loggedIn = new BehaviorSubject<boolean>(false);
  // isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.loginService.currentUser.subscribe((res) => {
      res !== null ? (this.user = res) : (this.user = null);
    });
  }
}
