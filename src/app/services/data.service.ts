import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {users} from '../services/filter.pipe';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string = 'http://localhost/Clinicord/cs-api/';
  
  constructor(private http: HttpClient) { 
    console.log("data service is working")
  }

  newprocessData(endpoint, data){
    return this.http.post<users>(this.url + endpoint, JSON.stringify(data));
  }
  processData(endpoint, data){
    return this.http.post(this.url + endpoint, JSON.stringify(data));
  }

  formData(endpoint, data){
    return this.http.post(this.url + endpoint, data);
  }
}
