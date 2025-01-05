import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../sevice/user.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public formGroup: FormGroup;

  readonly :boolean = true;
  userDetails$: Observable<User>;
  private userInformation: User;
  private loading: boolean;
  constructor(private userService: UserService,    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      id:['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.userDetails$ = this.userService.getUserDetails().pipe(map((response) => this.handleResponse(response,false)));
  }

  get f() {
    return this.formGroup.controls;
  }
  handleResponse(response: User,update:boolean): User {
    //To Do Response handling implementation
    if(update){
      this.readonly=true

      const refreshToken=  localStorage.getItem('refreshToken')
this.userService.refreshToken(refreshToken).subscribe({
  next:(response)=>{
    localStorage.setItem('refreshToken',response?.refreshToken);
    localStorage.setItem('accessToken',response?.accessToken);
    },
  error:(err)=>{
console.error(err);
  }
})
    }
    this.userInformation = response;
    this.formGroup.patchValue(response);
    this.loading=false;
    return response;
  }

  onSubmit(user: User) {
    this.readonly=true
this.userDetails$= this.userService.updateUserDetails(user).pipe(map((response) => this.handleResponse(response,true)));
  }
  modifyProfile(readonly:boolean){
    this.readonly=readonly
  }
}
