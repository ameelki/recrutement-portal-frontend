import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

declare const AmCharts: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,SharedModule, NgbDropdownModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.scss'
})
export class JobDescriptionComponent  implements OnInit {
  domainForm: FormGroup;
  jobForm: FormGroup;
  domainSelected: boolean = false;
  selectedDomain: string = '';
  
  // Domain and Subdomain data
  domains: string[] = ['Hospitality', 'Sales', 'Restaurants and Cafes', 'Hypermarket', 'Sports', 'Engineering Sector', 'Health Sector'];
  
  subdomains: any = {
    'Hospitality': ['Food Server / Waiter', 'Party Chef', 'Hostesses', 'Sous Chef', 'Bartender', 'Executive Chef', 'Demi Chef', 'Bar Manager'],
    'Sales': ['Branch Manager', 'Assistant Branch Manager', 'Sales Representative', 'Area Manager', 'Regional Manager'],
    'Restaurants and Cafes': ['Restaurant Manager', 'Assistant Restaurant Manager', 'Restaurant Equipment Maintenance Technician', 'Cafe Manager', 'Cafe Supervisor'],
    'Hypermarket': ['Fresh Food Manager', 'Bakery Supervisor', 'Bakery Section Manager'],
    'Sports': ['Sports Hall Coaches and Trainers', 'Sports Hall Managers'],
    'Engineering Sector': ['Project Manager', 'Technical Engineer', 'Quantity Surveyor', 'Civil Site Engineer', 'Quality Engineer'],
    'Health Sector': ['Doctor', 'Nurse', 'Health and Safety Engineer', 'Pharmacist', 'Lab Technician', 'Health Administrator', 'General Practitioner', 'Specialist Doctor', 'Physiotherapist', 'Hospital Manager', 'Nutritionist', 'Occupational Health & Safety Specialist', 'Radiologist', 'Medical Equipment Technician']
  };


  

  onDomainChange(event: any): void {
    // When the domain is selected, update the selectedDomain
    this.selectedDomain = event.target.value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Formulaire pour la sélection du domaine
    this.domainForm = this.fb.group({
      sector: ['', Validators.required],
      subdomain: ['', Validators.required],
    });
    this.domainForm = this.fb.group({
      sector: ['', Validators.required]
    });

    // Formulaire pour la description du poste
    this.jobForm = this.fb.group({
      companyName: ['', Validators.required],
      positionTitle: ['', Validators.required],
      numRequiredForPosition: ['', [Validators.required, Validators.min(1)]],
      jobDescription: ['', [Validators.required, Validators.maxLength(1000)]],
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
      publicationDate: ['', Validators.required],
    });
  }

  onDomainSubmit(): void {
    if (this.domainForm.valid) {
      this.domainSelected = true;  // Montre la carte du formulaire de description
    }
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      console.log('Form Submitted', this.jobForm.value);
    }
  }
}



