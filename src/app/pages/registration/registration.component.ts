import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustWatch } from '../helper/must-watch.validator';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  title = 'Clinicord';

  registerForm: FormGroup;
  submitted = false;


  constructor(
    public _user: UserService,
    private _ds: DataService,
    private _router: Router,
    private fb: FormBuilder ) {}


  

  ngOnInit(): void { 
        this.registerForm = this.fb.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue]
      }, {
          validator: MustWatch('password', 'confirmPassword')
      });
  }

  get f() { return this.registerForm.controls; }


      
      onSubmit() {
        this.submitted = true;
        let timerInterval
        
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        try{this._ds.processData('addaccounts', 
              this.registerForm.value).subscribe((response: any)=>{


                Swal.fire({
                  title: 'Confirming...',
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                      const content = Swal.getContent()
                      if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                          b.textContent = Swal.getTimerLeft()
                        }
                      }
                    }, 100)
                  },
                  willClose: () => {
                    clearInterval(timerInterval)
                  }
                }).then((result) => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registration Success',
                    showConfirmButton: false,
                    timer: 1500
                      });
                    });
                    console.log(response);

                    this._router.navigate(['login']);
                  });

           }catch(error)

                  {
                console.log(error);
        
               }
  
    }

   

  homepage(){
    if(this._user.isLoggedIn()){
      this._router.navigate(['/tabs']);
    }else{
      this._router.navigate(['/']);
    }

  }
  
}
