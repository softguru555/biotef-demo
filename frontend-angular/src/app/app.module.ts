// shared.module.ts
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // Global Toastr configuration
  ],
  exports: [BrowserAnimationsModule, ToastrModule], // Export to use in other modules
})
export class AppModule {}
