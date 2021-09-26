import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any;
  term: any;
  closeResult = '';
  page :number = 1;
  pageSize: number = 4;
  NotDelete: string = 'F';
  IsDelete : string = 'T';
  url: string = "http://localhost/Clinicord/cs-api/images/";

  constructor(private _ds: DataService) { }

  ngOnInit(): void {
    this.get_accounts()
  }


  get_accounts(){
    this._ds.processData1(btoa('getaccounts'), '', 2).subscribe((res: any)=>{
     let load  = this._ds.decrypt(res.a);
     this.accounts  = load.payload;
    //  console.log(this.accounts);
     
    });
  }

  async activate(id){
    console.log(id)
    this._ds.processData1(btoa('activate'), id, 2).subscribe((res: any)=>{
      let load  = this._ds.decrypt(res.a);
      this.accounts  = load.payload;
    });

  }

  async deactivate(id){
    this._ds.processData1(btoa('deactivate'), id, 2).subscribe((res: any)=>{
      let load  = this._ds.decrypt(res.a);
      this.accounts  = load.payload;
     });
  }
}
