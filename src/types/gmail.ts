export interface GmailStatus {
  connected: boolean;
  email: string | null;
  lastSyncedAt: string | null;
}

export interface GmailCallbackResult {
  connected: boolean;
  email: string;
}
