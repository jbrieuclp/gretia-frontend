import {Deserializable} from "./deserializable.model";

export class User implements Deserializable {

	id: number
	username: number
	lastLogin: number
	token: string;
  roles?: Array<string>;
	expires_at: Date;

	deserialize(input: any) {
    Object.assign(this, input);
    this.expires_at = input == null ? new Date() : new Date(input.expires_at);
    return this;
  }

	public isAuthenticated(): boolean {
    return this.token !== null && !this.isExpired();
  }

  public isExpired(): boolean {
  	return this.expires_at.getTime() <= new Date().getTime();
  }

  public hasRole(role: string): boolean {
    return this.roles != null && this.roles.indexOf(role) !== -1;
  }
}