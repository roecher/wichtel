export type ContactType = 'email' | 'whatsapp';

export interface Participant {
  name: string;
  contact: string | null;
  contactType: ContactType;
  id: string;
}

export interface Assignment {
  token: string;
  giverId: string;
  giverName: string;
  receiverName: string;
}

export interface AssignmentsData {
  assignments: Assignment[];
}
