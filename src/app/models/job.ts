import { randomUUID } from "crypto";
import { EProfile } from "../shared/enums/profile.enum";
import User from "./user";

export default class Job {
  private _id: string;
  get id(): string {
    return this._id;
  }

  private _description: string;
  get description(): string {
    return this._description;
  }

  private _company: string;
  get company(): string {
    return this._company;
  }

  private _deadline: Date;
  get deadline(): Date {
    return this._deadline;
  }

  private _enable: boolean;
  get enable(): boolean {
    return this._enable;
  }

  private _maxCandidates?: number;
  get maxCandidates(): number | undefined {
    return this._maxCandidates;
  }

  private _recruiter: User;
  get recruiter(): User {
    return this._recruiter;
  }

  private _candidates: User[];

  get candidates(): User[] {
    return this._candidates;
  }

  constructor(
    description: string,
    company: string,
    deadline: Date,
    recruiter: User,
    enable: boolean,
    maxCandidates?: number,
    id?: string,
    candidates?: User[]
  ) {
    this._description = description;
    this._company = company;
    this._deadline = deadline;
    this._recruiter = recruiter;
    this._enable = enable;
    this._maxCandidates = maxCandidates;
    this._id = id ?? randomUUID();
    this._candidates = [];

    // valida se todos os usuários da lista são do perfil CANDIDATE
    // se nao for, joga um erro
    if (candidates) {
      const validCandidates = candidates.every(
        (candidate) => candidate.profile === EProfile.CANDIDATE
      );

      if (!validCandidates) {
        throw new Error(
          "Somente usuários do perfil CANDIDATE podem ser candidatos."
        );
      }

      this._candidates = candidates;
    }
  }

  toJson() {
    return {
      id: this._id,
      description: this._description,
      company: this._company,
      deadline: this._deadline,
      maxCandidates: this._maxCandidates,
      enable: this._enable,
      recruiter: this._recruiter.toJson(),
    };
  }

  isFull(): boolean {
    if (!this.maxCandidates) return false;

    return this.maxCandidates === this.candidates.length;
  }

  candidateAlreadyApply(candidateId: string): boolean {
    return this.candidates.some((candidate) => candidate.id === candidateId);
  }
}
