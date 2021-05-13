import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;

  constructor() { }

  setLoggedIn() {
    this.loggedIn = true;
  }

  setLoggedOut() {
    this.loggedIn = true;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
