import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('transformPanel', [
      transition('void => *', [style({ transform: 'scale(0)' }), animate(300)]),
      transition('* => void', [animate(300, style({ transform: 'scale(0)' }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  state = 'done';

  ngOnInit(): void {
    this.router.navigate(['auth/login']);
  }
}
