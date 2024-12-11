import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-template',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent implements OnInit {
  constructor(private router: Router) {}
  loggedIn = new BehaviorSubject<boolean>(false);

  // isLoggedIn: boolean = false;
  ngOnInit(): void {
    var userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.loggedIn.next(true);
    } else {
      this.router.navigate(['auth/login']);
    }
  }
}
