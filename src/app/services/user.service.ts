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
    this.loggedIn = false;
  }

  isLoggedIn() {
    // this.loggedIn = window.sessionStorage.getItem('login')=='true'?true:false;
    return this.loggedIn;
  }
}
