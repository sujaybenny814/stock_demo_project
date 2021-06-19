import { Injectable } from '@angular/core';
import { HttpClient , HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor{
  intercept(httpRequest:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    const authorization = `Bearer ${localStorage.getItem("token")}`;
    return next.handle(httpRequest.clone({setHeaders:{authorization}}))
  }
  backendUrl =environment.apiURL + "/company"

  constructor(private http:HttpClient) { }

  callApi(searchText:string){
    console.log(this.backendUrl)
  return this.http.post(this.backendUrl,{searchText:searchText})
  }
}
