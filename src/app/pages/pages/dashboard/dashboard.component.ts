import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';


import { DataService } from '../../../services/data.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { stringify } from '@angular/compiler/src/util';
import { interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mySubscription: Subscription;
  accounts: any;
  status: string;
  verified: string;
  isDeleted: string;
  appointment: any;
  myChart1: any;
 
  ngOnInit() {
    this.apAnalytics();
    this.userAnalytics();
    this.userstatusAnalytics();

  }


  constructor(private storage: LocalStorageService, private _ds: DataService) {

    // this.mySubscription = interval(5000).subscribe((x => {
    //   this.apAnalytics();
    //   this.userAnalytics();
    //   this.userstatusAnalytics();
    // }));
  }
  async apAnalytics() {
    var cancelled = 0;
    var approved = 0;
    var pending = 0;
    var finished = 0;
    var dashboard = [];

    this._ds.processData1(btoa('getdashboard'), '', 2).subscribe((res: any) => {
      let load  = this._ds.decrypt(res.a);
      load = load.payload;
      // console.log(load);
    
      for (let i = 0; i <  load.length; i++) {
        this.status = load[i]['ap_status'];
        this.isDeleted = load[i]['IsDeleted'];
        // console.log(this.status, this.isDeleted);

        switch(this.status) {
          case 'Cancelled':
            dashboard[3] += 1;  
            break;
          case 'Pending':
            dashboard[2] += 1;
            break;
          case 'Approved':
              dashboard[1]= 1;
            break;
          case 'Finished':
              dashboard[0] += 1;
            break;
          default:
            // code block
        }
        
        // if (this.status == 'Cancelled') {
        //   dashboard[3] += 1;
        //   // console.log(cancelled);
        // }else if(this.status == 'Pending') {
        //   dashboard[2] += 1;
        //   // console.log(approved);
        // }else if(this.status == 'Approved') {
        //   dashboard[1]= 1;
        //   // console.log(pending);
        // } else {
        //   dashboard[0] += 1;
        // }
        console.log(dashboard[0],dashboard[1],dashboard[2],dashboard[3] );
      }
      console.log(load.length);
    });
  
      
    this.storage.setItem('approved', stringify(approved));
    this.storage.setItem('pending', stringify(pending));
    this.storage.setItem('finished', stringify(finished));
    this.storage.setItem('cancelled', stringify(cancelled));

    this.myChart1 = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Finished', 'Approved', 'Pending', 'Cancelled'],
        datasets: [{
          label: 'Appointments Status Analytics',
          data: dashboard,
          backgroundColor: [
            'rgba(43, 46, 74, .7)',
            'rgba(63, 191, 63, .7)',
            'rgba(161, 191, 63, .7)',
            'rgba(255, 74, 71, .7)',
          ],
          borderColor: [
            'rgba(43, 46, 74, 0.8)',
            'rgba(63, 191, 63, .7)',
            'rgba(161, 191, 63, .7)',
            'rgba(255, 74, 71, .7)',
          ],
          barPercentage: .5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  async userAnalytics() {
    this._ds.processData1(btoa('getaccounts'), '', 2).subscribe((res: any) => {
      let load  = this._ds.decrypt(res.a);
      load = load.payload;
      // console.log(load);

      let doctor = 0;
      let client = 0;
      for (let i = 0; i < load.length; i++) {
        this.accounts = load[i]['User_role'];

        // console.log(this.accounts);
        if (this.accounts == '1') {
          doctor += 1;
          // console.log(doctor);
        } else if (this.accounts == '0') {
          client += 1;
          // console.log(client);

        } else {
        }
      }
      this.storage.setItem('doctor', stringify(doctor));
      this.storage.setItem('client', stringify(client));
    });

     var myChart = new Chart('myChart2', {
      type: 'bar',
      data: {
        labels: ['Clients', 'Doctor'],
        datasets: [{
          label: 'Users Composition Analytics',
          data: [
            this.storage.getItem('client'),
            this.storage.getItem('doctor')
          ],
          backgroundColor: [

            'rgba(19, 59, 92, .7)',
            'rgba(255, 165, 0, .7)'
          ],
          borderColor: [
            'rgba(19, 59, 92, 0.8)',
            'rgba(255, 165, 0, 0.8)'
          ],
          barPercentage: .25
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });

  }


  async userstatusAnalytics() {
    
    this._ds.processData1(btoa('getaccountstatus'), '', 2).subscribe((res: any) => {
      let load  = this._ds.decrypt(res.a);
      load = load.payload;
      // console.log(load);

      let verify = 0;
      let unverified = 0;
      for (let i = 0; i < load.length; i++) {
        this.verified = load[i]['User_Verified'];
        // console.log(this.verified);

        if (this.verified == 'T') {
          verify += 1;
          // console.log('verify',verify);
        } else {
          unverified += 1;
          // console.log('unverified',unverified);
        }
      }
      this.storage.setItem('verify', stringify(verify));
      this.storage.setItem('unverified', stringify(unverified));
    });

     var myChart = new Chart('myChart3', {
      type: 'bar',
      data: {
        labels: ['Verified', 'Unverified'],
        datasets: [{
          label: 'Account Status Analytics',
          data: [
            this.storage.getItem('verify'),
            this.storage.getItem('unverified')
          ],
          backgroundColor: [
            'rgba(255, 165, 0, .7)',
            'rgba(16, 34, 42, 0.8)'
          ],
          borderColor: [
            'rgba(255, 165, 0, .7)',
            'rgba(16, 34, 42, 0.8)'
          ],
          barPercentage: .25
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}