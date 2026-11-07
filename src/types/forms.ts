export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface VolunteerFormData {
  fullName: string;
  email: string;
  phone?: string;
  interestAreas: string[];
  availability?: string;
  linkedinProfile?: string;
  message?: string;
}

export interface PartnershipFormData {
  organizationName: string;
  contactName: string;
  email: string;
  phone?: string;
  partnershipType: string;
  proposalDetails: string;
}

export interface OpportunityRegistrationData {
  opportunityId: string;
  fullName: string;
  email: string;
  phone?: string;
  notes?: string;
}
