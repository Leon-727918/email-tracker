
export enum EmailStatus {
  SENT = 'SENT',
  REPLIED = 'REPLIED',
  PENDING_FOLLOWUP = 'PENDING_FOLLOWUP',
  ARCHIVED = 'ARCHIVED'
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
}

export interface TrackedEmail {
  id: string;
  subject: string;
  recipient: string;
  sentDate: string;
  lastInteraction: string;
  status: EmailStatus;
  followUpCount: number;
  content: string;
  categoryId?: string;
  attachments: Attachment[];
}

export interface DashboardStats {
  totalSent: number;
  responseRate: number;
  pendingFollowUps: number;
  averageResponseTime: string;
}
