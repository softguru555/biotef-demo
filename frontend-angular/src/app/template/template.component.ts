import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent implements OnInit {
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    
    var userInfo = window.localStorage.getItem('userInfo');
    if(userInfo) {
      this.isLoggedIn = true;
      console.log("isLoggedIn", this.isLoggedIn);
    }
  }
}
