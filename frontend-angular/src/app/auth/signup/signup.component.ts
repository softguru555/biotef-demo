import { Component, OnInit, NgZone } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SignupService } from '../../services/signup/signup.service';

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
  show: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public zone: NgZone,
    private signupService : SignupService,
  ) {
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm () {
    // this.billingAddressFormGroup = this.formBuilder.group({ addressInput: ['', Validators.required] });

    this.signupFormGroup = this.formBuilder.group({
      billCompanyName: ['', Validators.required],
      billContactName: ['', Validators.required],
      billAddress: ['', Validators.required],
      // billAddress: this.billingAddressFormGroup,
      billEmail: ['', Validators.required],
      billPhone: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get billCompanyName() { return this.signupFormGroup.get('billCompanyName')! };
  get billContactName() { return this.signupFormGroup.get('billContactName')! };
  get billAddress() { return this.signupFormGroup.get('billAddress')! };
  get billEmail() { return this.signupFormGroup.get('billEmail')! };
  get billPhone() { return this.signupFormGroup.get('billPhone')! };
  get password() { return this.signupFormGroup.get('password')! };
  get confirmPassword() { return this.signupFormGroup.get('confirmPassword')! };

  getAddress(obj: any) {
    this.zone.run(() => {
      if (obj.place)
        if (obj.type == 'billing')
          this.billAddress.setValue(obj.place)
    });
  }
  signup() {
    const companyName = this.billCompanyName.value;
    const contactName = this.billContactName.value;
    const address = this.billAddress.value;
    const email = this.billEmail.value;
    const phone = this.billPhone.value;
    const password = this.password.value;
    // // encrypt email and password while login
    // const encryptedPassword = CryptoJS.AES.encrypt(JSON.stringify({ email, password }), 'biotefCredentials').toString();
    this.signupService.signup({email: email, password: password, phone: phone, address: address, companyName: companyName, contactName: contactName}).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        

      },
      error: (error) => {
        this.show = true;
        console.log("login failed:", error);
      }
    })
  }
}
