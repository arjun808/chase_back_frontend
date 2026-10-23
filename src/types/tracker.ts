export type ApplicationStage =
  | 'applied'
  | 'under_review'
  | 'interview'
  | 'waiting_on_recruiter'
  | 'needs_follow_up'
  | 'offer'
  | 'ghosted'
  | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  stage: ApplicationStage;
  appliedDate: string;
  lastEmailDate: string;
  daysSinceLastContact: number;
  threadSubject: string;
  recruiterName?: string;
  recruiterEmail?: string;
  suggestedAction?: string;
  ghostScore?: number; // 0-100 likelihood of ghosting
}

export interface DashboardStats {
  activeApplications: number;
  waitingOnRecruiter: number;
  needsFollowUp: number;
  ghostedOrInactive: number;
}
