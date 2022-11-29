import { randomUUID } from "crypto";
import { EProfile } from "../shared/enums/profile.enum";

export default class User {
  _id: string;
  get id(): string {
    return this._id;
  }

  _name: string;
  get name(): string {
    return this._name;
  }

  _username: string;
  get username(): string {
    return this._username;
  }

  _profile: EProfile;
  get profile(): EProfile {
    return this._profile;
  }

  _company?: string;
  get company(): string | undefined {
    return this._company;
  }

  constructor(
    name: string,
    username: string,
    profile: EProfile,
    company?: string,
    id?: string
  ) {
    if (profile.toUpperCase() === EProfile.RECRUITER) {
      if (!company) {
        throw new Error("Usuário inválido");
      }

      this._company = company;
    }

    this._name = name;
    this._username = username;
    this._profile = profile;
    this._id = id ?? randomUUID();
  }

  toJson() {
    return {
      id: this._id,
      name: this._name,
      username: this._username,
      profile: this._profile,
      company: this._company,
    };
  }
}
