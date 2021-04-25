import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
<<<<<<< Updated upstream
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
=======

  constructor() {}

  ngOnInit(): void {
>>>>>>> Stashed changes
  }

  
  
  get_accounts(){
    this.ds.processData('getclients', null).subscribe((res: any)=>{
      this.clients = res.data;
   
    });
    
  }

}