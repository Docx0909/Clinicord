import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string = 'http://localhost/Clinicord/cs-api/';
  
  constructor(private http: HttpClient) { 
    console.log("data service is working")
  }

  processData(endpoint, data){
    return this.http.post(this.url + endpoint, JSON.stringify(data));
  }
}
