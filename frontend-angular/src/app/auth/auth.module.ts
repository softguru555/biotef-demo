// feature.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { SignupComponent } from './signup/signup.component';
@NgModule({
    declarations: [],
    imports: [SignupComponent, CommonModule, AppModule], // Import shared module here
})
export class FeatureModule {}
