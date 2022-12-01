import { randomUUID } from "crypto";
import User from "./user";

export default class Job {
  _id: string;
  get id(): string {
    return this._id;
  }

  _description: string;
  get description(): string {
    return this._description;
  }

  _company: string;
  get company(): string {
    return this._company;
  }

  _deadline: Date;
  get deadline(): Date {
    return this._deadline;
  }

  _enable: boolean;
  get enable(): boolean {
    return this._enable;
  }

  _maxCandidates?: number;
  get maxCandidates(): number | undefined {
    return this._maxCandidates;
  }

  _recruiter: User;
  get recruiter(): User {
    return this._recruiter;
  }

  constructor(
    description: string,
    company: string,
    deadline: Date,
    recruiter: User,
    enable: boolean,
    maxCandidates?: number,
    id?: string
  ) {
    this._description = description;
    this._company = company;
    this._deadline = deadline;
    this._recruiter = recruiter;
    this._enable = enable;
    this._maxCandidates = maxCandidates;
    this._id = id ?? randomUUID();
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
}
