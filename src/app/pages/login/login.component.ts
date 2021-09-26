import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(
    private _ds: DataService,
    private _user: UserService,
    private _router: Router,
    public localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) { }

  public name: string;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required]
  })

    if(this._user.isUserLoggedIn()){
      this._router.navigate(['/tabs/dashboard']);
    }
  }
  
  get f() { return this.loginForm.controls; }

  onSubmit() {
 
          this._ds.processData1(btoa('login').replace('=', ''), this.loginForm.value, 1).subscribe((dt: any) => {
            let load  = this._ds.decrypt(dt.a);
            load = load.payload;
            this._user.setUserLoggedIn(load.id, load.username, load.email, load.key, load.role, load.ispwordtochange);
            // console.log(load);
            
          if(load.role == "admin"){
            Swal.fire({
              html: '<h2> Welcome!</h2> ' + '<h4 style="color: lightgreen;">' + load.username + '</h4>' ,
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6'}).then((result) => {
                if (result.isConfirmed) {
                
                    this._router.navigate(['/tabs']);
                }
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Login failed!',
                text: 'Retry',
                showCancelButton: false,
                confirmButtonColor: '#3085d6'});
            }
          }, er =>{
            Swal.fire({
                  icon: 'error',
                  title: 'Login failed!',
                  text: 'Retry',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6'});
          });
    } 
}
