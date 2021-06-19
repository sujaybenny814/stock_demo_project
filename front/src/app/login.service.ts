import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  backendUrl =environment.apiURL + "/login"

  callApi(data:string){
    console.log(this.backendUrl)
  return this.http.put(this.backendUrl,data)
  }
}
