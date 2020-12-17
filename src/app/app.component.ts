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


  constructor(
    public _user: UserService, 
    private ds: DataService,
    private _router: Router,
    private localStorageService: LocalStorageService) {}


    public name: string;

  ngOnInit(): void {
    this.get_accounts();
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
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6'}).then((result) => {
        if (result.isConfirmed) {
        
             this._user.setLoggedOut();
            this._router.navigate(['login']);
        }
      })
  }

  
  
  get_accounts(){
    this.ds.processData('getclients', null).subscribe((res: any)=>{
      this.clients = res.data;
   
    });
    
  }

}