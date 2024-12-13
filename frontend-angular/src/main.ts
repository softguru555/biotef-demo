import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideHotToastConfig(),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      BrowserAnimationsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot({
        // Add Toastr configuration
        timeOut: 1000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })
    ),
    DatePipe,
  ],
}).catch((err) => console.error(err));
