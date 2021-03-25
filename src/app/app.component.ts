import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Clinicord';
  clients: any;
  name: string;

  constructor(
    public _user: UserService, 
    private ds: DataService,
    private _router: Router,
    public localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.name = this.localStorageService.getItem("myValue")
  }

  
  homepage(){
    if(this._user.isLoggedIn()){
      this._router.navigate(['dashboard']);
    }else{
      this._router.navigate(['login']);
    }

  }
  
  logoutButton() {
      Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to leave?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      confirmButtonColor: '#3085d6'}).then((result) => {
        if (result.isConfirmed) {
            this.name = "";
            this.localStorageService.removeItem("myValue");
            this.localStorageService.clear();
            this._user.setLoggedOut();
            this._router.navigate(['login']);
        }
      })
  }

}