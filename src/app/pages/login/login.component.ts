import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _ds: DataService,
    private _user: UserService,
    private _router: Router,
    private localStorageService: LocalStorageService
  ) { }

  public name: string;


  ngOnInit(): void {
    if(this._user.isLoggedIn()){
      this._router.navigate(['dashboard']);
    }
  }
  

  onSubmit(e) {
    e.preventDefault();
    let param1 = e.target[0].value;
        let param2 = e.target[1].value;
 
      if (param1 != "" || param2 != ""){
        try{
        this._ds.processData('login', { param1, param2 }).subscribe((res: any)=>{

          this.localStorageService.setItem("myValue", param1)
          this.name = this.localStorageService.getItem("myValue")
          Swal.fire({
          html: '<h2> Welcome!</h2> ' + '<h4>' + this.name + '</h4>' ,
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6'}).then((result) => {
            if (result.isConfirmed) {
            
                this._user.setLoggedIn();
                this._router.navigate(['dashboard']);
            }
          })
        });
          }  catch (Error)   
          {  
            // alert(Error.message);  
          }  
          }   else{
            Swal.fire({
              icon: 'error',
              title: 'Login failed!',
              text: 'Retry',
              showCancelButton: false,
              confirmButtonColor: '#3085d6'});
          }
    }
      
  
}
