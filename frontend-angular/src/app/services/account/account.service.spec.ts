import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('find all acounts', () => {
    expect(
      service.getUserInfo({ limit: 5, page: 1 }).subscribe((res) => {
        expect(res.length).toBe(5);
        const account = res[4];

        expect(account.email).toBe('softguru555@gmail.com');
      })
    ).toBeTruthy();
  });
});
