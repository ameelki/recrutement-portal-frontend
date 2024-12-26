import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User, UserService } from 'src/app/sevice/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export default class AuthSignupComponent {signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(6)]], 
      password: ['', [Validators.required, Validators.minLength(6)]], // Validation mot de passe
          });
  }
  
  ngOnInit(): void {}

  onSubmit() {
 if (this.signUpForm.invalid) {
      Object.keys(this.signUpForm.controls).forEach(controlName => {
        const control = this.signUpForm.get(controlName);
        if (control && control.invalid) {
          Swal.fire({
            title: 'Error!',
            text: `${controlName} is invalid`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
      return;
    }

    Swal.fire({
      title: 'Creating User',
      text: 'Please wait while we process your request.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Afficher l'animation de chargement
      }
    });
    const user: User = this.signUpForm.value; // Use the model here

    this.userservice.createUser(user).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User created successfully!',
        });
      
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
        });
      }
    );
  }
}
