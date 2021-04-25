import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Clinicord';

  
  clients: any;


  constructor() {}


    public name: string;

  ngOnInit(): void {
  
  }

  

}