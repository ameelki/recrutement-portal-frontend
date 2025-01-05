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
    });
  }
  ngOnInit(): void {
    this.userDetails$ = this.userService.getUserDetails().pipe(map((response) => this.handleResponse(response)));;
  }

  get f() {
    return this.formGroup.controls;
  }
  handleResponse(response: User): User {
    //To Do Response handling implementation
    this.userInformation = response;
    this.formGroup.patchValue(response);
    this.loading=false;
    return response;
  }

  onSubmit(user: User) {
    this.readonly=true

  }
  modifyProfile(readonly:boolean){
    this.readonly=readonly
  }
}
