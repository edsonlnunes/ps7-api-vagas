export enum EProfile {
  ADMIN = "ADMIN",
  RECRUITER = "RECRUITER",
  CANDIDATE = "CANDIDATE",
}

export type ExpProfile = keyof typeof EProfile;
