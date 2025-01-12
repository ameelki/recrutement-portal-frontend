export interface JobDescriptionRequest {
 domaine: string; // Domaine sélectionné
    subDomaine?: string;
  subDomains?:string; // Sous-domaine sélectionné
    companyName: string; // Nom de l'entreprise
    positionTitle: string; // Titre du poste
    numRequiredForPosition: number; // Nombre de positions requises
    jobDescription: string; // Description du poste
    basicSalary: number; // Salaire de base
    foodAllowance: number; // Allocation de nourriture
    otherAllowance: number; // Autres allocations
    leavePolicy: string; // Politique de congés
    airTicketAllowance: string; // Billet d'avion
    accommodation: string; // Hébergement
    workingHours: string; // Heures de travail
    medicalBenefits: string; // Avantages médicaux
    contactEmail: string; // E-mail de contact
    contactPhone: string; // Téléphone de contact
    contactMobile: string; // Mobile de contact
  }
