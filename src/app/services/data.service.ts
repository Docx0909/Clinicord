import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultImage } from '../data-schema';

import * as CryptoJS from 'crypto-js';
import aes from 'crypto-js/aes';
import encHex from 'crypto-js/enc-hex';
import padZeroPadding from 'crypto-js/pad-zeropadding';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private keyString = new DefaultImage();

  constructor(private _http: HttpClient, private _user: UserService) { 
    console.log("data service is working")
  }

  processData1(api: string, load:any, sw:number){
    // console.log(load);

    let payload = {load: load, token: this._user.getToken(), userid: this._user.getUserID() }
    
    switch(sw){
      case 1:
        return this._http.post(this._user.apiLink+api, this.convertmessage(unescape(encodeURIComponent(JSON.stringify(load)))));      
      break;

      case 2:
        return this._http.post(this._user.apiLink+api, this.convertmessage(unescape(encodeURIComponent(JSON.stringify(payload)))));
      break;
      
      case 3:
        return this._http.post(this._user.apiLink+api, load);
      break;

      default: 
      break;
     }

  }
  // newprocessData(endpoint, data){
  //   return this.http.post<users>(this.url + endpoint, JSON.stringify(data));
  // }
  // processData(endpoint, data){
  //   return this.http.post(this.url + endpoint, JSON.stringify(data));
  // }

  // formData(endpoint, data){
  //   return this.http.post(this.url + endpoint, data);
  // }

  decrypt(encryptedString) {
    let key = this.keyString.defaultmessage;
    let encryptMethod = 'AES-256-CBC';
    let encryptLength = parseInt(encryptMethod.match(/\d+/)[0]);
    let json = JSON.parse(
      CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString))
    );
    let salt = CryptoJS.enc.Hex.parse(json.salt);
    let iv = CryptoJS.enc.Hex.parse(json.iv);

    let encrypted = json.ciphertext;

    let iterations = parseInt(json.iterations);
    if (iterations <= 0) {
      iterations = 999;
    }
    let encryptMethodLength = encryptLength / 4;
    let hashKey = CryptoJS.PBKDF2(key, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: encryptMethodLength / 8,
      iterations: iterations,
    });

    let decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {
      mode: CryptoJS.mode.CBC,
      iv: iv,
    });

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
  
  private convertmessage(msg) {
    let keyString = this._user.genHexString(32);
    let ivString = this._user.genHexString(32);
    let key = encHex.parse(keyString);
    let iv =  encHex.parse(ivString);
    
    return this.keyString.generateSalt()+iv+key+aes.encrypt(msg, key, {iv:iv, padding:padZeroPadding}).toString();
  }
}
