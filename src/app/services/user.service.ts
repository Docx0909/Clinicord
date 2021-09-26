import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiLink: string = 'http://192.168.1.59/Clinicord/cs-api/';
  
  private username: string;
  private token: string;
  private email: string;
  private userId: string;
  private role: any;
  public ispwordchanged: number;
  private isLoggedIn: boolean = false;

  constructor(private _router: Router, private _storage: LocalStorageService) { }


  getToken(): string { return this.token }
  getUserID(): string { return this.userId }
  getUsername(): string {
    return this.username;
  }
  getRole(): string { return this.role }
  getEmail(): string { return this.email }

  setLogOut(): void {
    this.isLoggedIn = false;
    this._storage.clear();
    this._router.navigate(['/']);   

  }
  isUserLoggedIn(): boolean { 
    // this.isLoggedIn = window.sessionStorage.getItem('login')=='true'?true:false;
    return this.isLoggedIn  }

  setUserLoggedIn(id: string, username: string, email: string, token: string,  role: any,  pwordchange: number ): void {
    // window.sessionStorage.setItem('login', 'true');
    this.isLoggedIn = true;
    this.username = username;
    this.email = email;
    this.token = token;
    this.userId = id;
    this.role = role;
    
    // if(image==' ') {
    //   image = 'images/';
    // }
    // this.profilepic = this.apiLink + 'images/' + image;
    this.ispwordchanged = pwordchange;

    // this.loggedIn = true;
    this._storage.setItem('username', this.username);

  }

  genHexString(len) {
    const hex = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
  }
}