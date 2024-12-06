import { Component, OnInit, NgZone } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { GoogleAutocompleteModule } from '../../component/google-autocomplete/google-autocomplete.module';

@Component({
  selector: 'app-signup',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    // GoogleAutocompleteModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupFormGroup!: FormGroup;
  billingAddressFormGroup!: FormGroup;
  loading: boolean = false;
  userGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public zone: NgZone,

  ) {
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm () {
    this.billingAddressFormGroup = this.formBuilder.group({ addressInput: ['', Validators.required] });

    this.signupFormGroup = this.formBuilder.group({
      companyName: ['', Validators.required],
      contactName: ['', Validators.required],
      billAddress: ['', Validators.required],
      // billAddress: this.billingAddressFormGroup,
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get billCompanyName() { return this.signupFormGroup.get('companyName')! };
  get billContactName() { return this.signupFormGroup.get('contactName')! };
  get billAddress() { return this.billingAddressFormGroup.get('addressInput')! };
  get billEmail() { return this.signupFormGroup.get('email')! };
  get billPhone() { return this.signupFormGroup.get('phone')! };
  get password() { return this.signupFormGroup.get('password')! };
  get confirmPassword() { return this.signupFormGroup.get('confirmPassword')! };

  getAddress(obj: any) {
    this.zone.run(() => {
      if (obj.place)
        if (obj.type == 'billing')
          this.billAddress.setValue(obj.place)
    });
  }
  
}
