import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('SignupService', () => {
  let service: SignupService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignupService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SignupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('hello', () => {
    service
      .signup({
        email: 'soft@gmail.com',
        password: '123456',
        phone: '123456789',
        address: 'www',
        companyName: 'www',
        contactName: 'www',
      })
      .subscribe((user) => {
        expect(user.length).toBe(1);
        expect(user[0].email).toBe('soft@gmail.com');
      });
  });
});
