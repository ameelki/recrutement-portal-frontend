import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { JobDescriptionService } from 'src/app/sevice/job-description.service';
import { JobDescriptionRequest } from '../../model/JobDescriptionRequest';

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, SharedModule, NgbDropdownModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.scss'
})
export class JobDescriptionComponent implements OnInit {
  domainForm: FormGroup;
  jobForm: FormGroup;
  domainSelected: boolean = false;
  selectedDomain: string = '';

  // Domain and Subdomain data
  domains: string[] = ['Hospitality', 'Sales', 'Restaurants and Cafes', 'Hypermarket', 'Sports', 'Engineering Sector', 'Health Sector'];

  subdomains: any = {
    Hospitality: [
      'Food Server / Waiter',
      'Party Chef',
      'Hostesses',
      'Sous Chef',
      'Bartender',
      'Executive Chef',
      'Demi Chef',
      'Bar Manager'
    ],
    Sales: ['Branch Manager', 'Assistant Branch Manager', 'Sales Representative', 'Area Manager', 'Regional Manager'],
    'Restaurants and Cafes': [
      'Restaurant Manager',
      'Assistant Restaurant Manager',
      'Restaurant Equipment Maintenance Technician',
      'Cafe Manager',
      'Cafe Supervisor'
    ],
    Hypermarket: ['Fresh Food Manager', 'Bakery Supervisor', 'Bakery Section Manager'],
    Sports: ['Sports Hall Coaches and Trainers', 'Sports Hall Managers'],
    'Engineering Sector': ['Project Manager', 'Technical Engineer', 'Quantity Surveyor', 'Civil Site Engineer', 'Quality Engineer'],
    'Health Sector': [
      'Doctor',
      'Nurse',
      'Health and Safety Engineer',
      'Pharmacist',
      'Lab Technician',
      'Health Administrator',
      'General Practitioner',
      'Specialist Doctor',
      'Physiotherapist',
      'Hospital Manager',
      'Nutritionist',
      'Occupational Health & Safety Specialist',
      'Radiologist',
      'Medical Equipment Technician'
    ]
  };

  onDomainChange(event: any): void {
    // When the domain is selected, update the selectedDomain
    this.selectedDomain = event.target.value;
    console.log(this.domainForm.value);
  }

  constructor(
    private fb: FormBuilder,
    private jobdescription: JobDescriptionService
  ) {}

  ngOnInit(): void {
    // Formulaire pour la sélection du domaine
    this.domainForm = this.fb.group({
      sector: ['', Validators.required],
      subdomain: ['', Validators.required]
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
      contactMobile: ['', Validators.maxLength(20)]
    });
  }

  onDomainSubmit(): void {
    if (this.domainForm.valid) {
      this.domainSelected = true; // Montre la carte du formulaire de description
    }
  }

  async onSubmit(): Promise<void> {
    Swal.fire({
      title: 'Creating Job Description...',
      text: 'Please wait while we process your request.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    if (this.jobForm.valid) {
      const jobDescriptionRequest: JobDescriptionRequest = {
        domaine: this.domainForm.value.sector,
        subDomaine: this.domainForm.value.subdomain,
        companyName: this.jobForm.value.companyName,
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
        contactMobile: this.jobForm.value.contactMobile
      };
      try {
        const response = await this.jobdescription.createJobDescription(jobDescriptionRequest).toPromise();
        Swal.close();
        Swal.fire({
          title: 'Success!',
          text: 'Job Description created successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.domainSelected = false;
          this.domainForm.reset();
          this.jobForm.reset(); // Vider le formulaire
        });
      } catch (error) {
        Swal.close();
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!',
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
          break; // Arrêter l'exécution dès qu'une erreur est trouvée
        }
      }
    }
  }
}
