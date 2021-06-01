import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DataService } from '../../../services/data.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { stringify } from '@angular/compiler/src/util';
import { CalendarOptions } from '@fullcalendar/angular';
import { interval, Subscription} from 'rxjs';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
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

  ngOnInit() {
    this.apAnalytics();
    this.userAnalytics();
    this.userstatusAnalytics();

  }


  constructor(private storage: LocalStorageService, private modal: NgbModal, private ds: DataService) { 
    
    this.mySubscription= interval(1000).subscribe((x =>{
      this.ap_status();
      this.get_accounts();
      this.account_status();
    }));
  }



  async ap_status() {
    this.ds.processData('getdashboard', null).subscribe((res: any) => {

      let cancelled = 0;
      let approved = 0;
      let pending = 0;
      let finished = 0;
      for (let i = 0; i < res.data.length; i++) {
        this.status = res.data[i]['ap_status'];
        this.isDeleted = res.data[i]['IsDeleted'];

        if (this.status == 'Cancelled') {
          cancelled += 1;
          // console.log(cancelled);
        }
        if (this.status == 'Approved') {
          approved += 1;
          // console.log(approved);
        } else if (this.status == 'Pending') {
          pending += 1;
          // console.log(pending);
        } else if (this.status == 'Finished') {
          finished += 1;
          // console.log(finished);
        } else {
        }
      }
      this.storage.setItem('approved', stringify(approved));
      this.storage.setItem('pending', stringify(pending));
      this.storage.setItem('finished', stringify(finished));
      this.storage.setItem('cancelled', stringify(cancelled));


    });
  }
  async get_accounts() {
    this.ds.processData('getaccounts', null).subscribe((res: any) => {

      let doctor = 0;
      let client = 0;
      for (let i = 0; i < res.data.length; i++) {
        this.accounts = res.data[i]['User_role'];

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
  }
  async account_status() {
    this.ds.processData('getaccountstatus', null).subscribe((res: any) => {

      let verify = 0;
      let unverified = 0;
      for (let i = 0; i < res.data.length; i++) {
        this.verified = res.data[i]['isVerified'];
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
  }

  async apAnalytics() {
    var myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Finished', 'Approved', 'Pending', 'Cancelled'],
        datasets: [{
          label: 'Appointments Status Analytics',
          data: [
            this.storage.getItem('finished'),
            this.storage.getItem('approved'),
            this.storage.getItem('pending'),
            this.storage.getItem('cancelled')
          ],
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