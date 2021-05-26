import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {users} from 'src/app/services/filter.pipe';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: users [] = [];
  firstname: any;
  closeResult = '';
  page :number = 1;
  pageSize: number = 4;
  NotDelete: string = 'F';
  IsDelete : string = 'T';
  url: string = 'http://localhost/Clinicord/cs-api/images/';

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.get_accounts()
  }


  get_accounts(){
    this.ds.newprocessData('getaccounts', null).subscribe((res: any)=>{
      this.accounts = res.data;
      console.log(this.accounts)
    });
  }

  async activate(id){
    console.log(id)
    this.ds.newprocessData('activate', {id: id}).subscribe((res: any)=>{
      this.accounts = res.data;
    });

  }

  async deactivate(id){
    this.ds.newprocessData('deactivate', {id: id}).subscribe((res: any)=>{
      this.accounts = res.data;
     });
  }
  
  search() {
    if (this.firstname == "") {
      this.ngOnInit();
    } else {
      this.accounts = this.accounts.filter((res: any) => {
        return res.Client_name?.toLocaleLowerCase().match(this.firstname?.toLocaleLowerCase());

      });
    }
  }
}
