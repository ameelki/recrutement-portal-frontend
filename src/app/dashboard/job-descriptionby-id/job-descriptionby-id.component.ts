import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobDescriptionService } from '../../sevice/job-description.service';
import Swal from 'sweetalert2';
import { JobDescriptionRequest } from '../../model/JobDescriptionRequest';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from '../../theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-job-descriptionby-id',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,SharedModule, NgbDropdownModule,CommonModule],
  templateUrl: './job-descriptionby-id.component.html',
  styleUrl: './job-descriptionby-id.component.scss'
})
export class JobDescriptionbyIdComponent  implements OnInit  {
  domainForm: FormGroup;
  jobForm: FormGroup;
  domainSelected: boolean = false;
  selectedDomain: string = '';

  // Domain and Subdomain data
  domains: string[] = ['Hospitality', 'Sales', 'Restaurants and Cafes', 'Hypermarket', 'Sports', 'Engineering Sector', 'Health Sector'];
  onDomainChange(event: any): void {
    // When the domain is selected, update the selectedDomain
    this.selectedDomain = event.target.value;

  }
  subdomains: any = {
    'Hospitality': ['Food Server / Waiter', 'Party Chef', 'Hostesses', 'Sous Chef', 'Bartender', 'Executive Chef', 'Demi Chef', 'Bar Manager'],
    'Sales': ['Branch Manager', 'Assistant Branch Manager', 'Sales Representative', 'Area Manager', 'Regional Manager'],
    'Restaurants and Cafes': ['Restaurant Manager', 'Assistant Restaurant Manager', 'Restaurant Equipment Maintenance Technician', 'Cafe Manager', 'Cafe Supervisor'],
    'Hypermarket': ['Fresh Food Manager', 'Bakery Supervisor', 'Bakery Section Manager'],
    'Sports': ['Sports Hall Coaches and Trainers', 'Sports Hall Managers'],
    'Engineering Sector': ['Project Manager', 'Technical Engineer', 'Quantity Surveyor', 'Civil Site Engineer', 'Quality Engineer'],
    'Health Sector': ['Doctor', 'Nurse', 'Health and Safety Engineer', 'Pharmacist', 'Lab Technician', 'Health Administrator', 'General Practitioner', 'Specialist Doctor', 'Physiotherapist', 'Hospital Manager', 'Nutritionist', 'Occupational Health & Safety Specialist', 'Radiologist', 'Medical Equipment Technician'],
  };
  jobInformations$: Observable<any>;
  private id: number;

  constructor(private fb: FormBuilder,private jobdescription: JobDescriptionService,    private _Activatedroute: ActivatedRoute,
  ) {
     this.id = parseInt(
      this._Activatedroute.snapshot.paramMap.get('id') || '0'
    );

  }
  ngOnInit(): void {
    // Formulaire pour la sélection du domaine
    this.domainForm = this.fb.group({
      sector: ['', Validators.required],
      subdomain: ['', Validators.required],
    });

    // Formulaire pour la description du poste
    this.jobForm = this.fb.group({
      companyName: ['', Validators.required],
      positionTitle: ['', Validators.required],
      numRequiredForPosition: ['', [Validators.required, Validators.min(1)]],
      jobDescription: ['', [Validators.required, Validators.maxLength(10000)]],
      basicSalary: ['', Validators.required],
      foodAllowance: ['', Validators.required],
      otherAllowance: ['', Validators.required],
      leavePolicy: ['', Validators.required],
      airTicketAllowance: ['', Validators.required],
      accommodation: ['', Validators.required],
      workingHours: ['', Validators.required],
      medicalBenefits: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.maxLength(20)],
      contactMobile: ['', Validators.maxLength(20)],
    });
 this.jobInformations$ =   this.jobdescription.getJobDescriptionsById(this.id).pipe(map((response: any) => {
this.selectedDomain=response.doamine;
   this.domainForm.patchValue({
     sector: response.doamine,
     subdomain:response.subDomains,
    });
this.onDomainSubmit();
   this.jobForm.patchValue(response);
   return response;
 }));
}

  onDomainSubmit(): void {
    if (this.domainForm.valid) {
      this.domainSelected = true;  // Montre la carte du formulaire de description
    }
  }
   onSubmit(): void {
    Swal.fire({
      title: 'Updating Job Description...',
      text: 'Please wait while we process your request.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    if (this.jobForm.valid) {
      const jobDescriptionRequest: JobDescriptionRequest = {
        companyName: this.jobForm.value.companyName,
        doamine: this.domainForm.value.sector,
        subDomains: this.domainForm.value.subdomain,
        positionTitle: this.jobForm.value.positionTitle,
        numRequiredForPosition: this.jobForm.value.numRequiredForPosition,
        jobDescription: this.jobForm.value.jobDescription,
        basicSalary: this.jobForm.value.basicSalary,
        foodAllowance: this.jobForm.value.foodAllowance,
        otherAllowance: this.jobForm.value.otherAllowance,
        leavePolicy: this.jobForm.value.leavePolicy,
        airTicketAllowance: this.jobForm.value.airTicketAllowance,
        accommodation: this.jobForm.value.accommodation,
        workingHours: this.jobForm.value.workingHours,
        medicalBenefits: this.jobForm.value.medicalBenefits,
        contactEmail: this.jobForm.value.contactEmail,
        contactPhone: this.jobForm.value.contactPhone,
        contactMobile: this.jobForm.value.contactMobile,
      };
      try {
        this.jobInformations$ = this.jobdescription.updateJobDescription(jobDescriptionRequest,this.id).pipe(map((response: any) => {
          this.selectedDomain=response.doamine;
          this.domainForm.patchValue({
            sector: response.doamine,
            subdomain:response.subDomains,
          });
          this.onDomainSubmit();
          this.jobForm.patchValue(response);
          return response;
        }));
        Swal.close();
        Swal.fire({
          title: 'Success!',
          text: 'Job Description updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
        });
      } catch (error) {
        Swal.close();
        Swal.fire({
          title: 'Error!',
          text:  'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      Swal.close();
      for (const controlName of Object.keys(this.jobForm.controls)) {
        const control = this.jobForm.get(controlName);
        if (control && control.invalid) {
          Swal.fire({
            title: 'Error!',
            text: `${controlName} is invalid`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          break;  // Arrêter l'exécution dès qu'une erreur est trouvée
        }
      }
    }
  }
}
