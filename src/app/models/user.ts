import { randomUUID } from "crypto";
import { EProfile, ExpProfile } from "../shared/enums/profile.enum";

export default class User {
  private _id: string;
  get id(): string {
    return this._id;
  }

  private _name: string;
  get name(): string {
    return this._name;
  }

  private _username: string;
  get username(): string {
    return this._username;
  }

  private _profile: ExpProfile;
  get profile(): ExpProfile {
    return this._profile;
  }

  private _company?: string;
  get company(): string | undefined {
    return this._company;
  }

  private _password?: string;
  get password(): string | undefined {
    return this._password;
  }

  constructor(
    name: string,
    username: string,
    profile: ExpProfile,
    company?: string,
    id?: string,
    password?: string
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
    this._password = password;
  }

  removePassword() {
    this._password = undefined;
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
