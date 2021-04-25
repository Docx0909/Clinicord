import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
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
      this._router.navigate(['/tabs']);
    }else{
      this._router.navigate(['/']);
    }

  }
  
  async logoutButton() {

     await Swal.fire({
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
            this._router.navigate(['/']);           }
      })
  }

}