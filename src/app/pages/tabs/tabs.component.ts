import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';



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
    private _router: Router) {}

  ngOnInit(): void {
    this.name = this._user.getUsername();
  }

  
  homepage(){
    if(this._user.isUserLoggedIn()){
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
            this._user.setLogOut();
          }
      })
  }
}