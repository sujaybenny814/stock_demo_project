import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder} from '@angular/forms';
import {ChildComponent} from "../child/child.component"
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(ChildComponent) childView!:ChildComponent
  constructor(private apiService:ApiService,private formBuilder:FormBuilder,private router: Router) { }

  companyDetails:any
  disable :Boolean =false 
  nseDetails :any 

  searchForm = this.formBuilder.group({
    text :[''],
    searchResult:[""],
    result:this.formBuilder.group({
      name:[""],
      debToEquity:[""],
      currentMarketPrice:[""],
      debt:[""],
      dividendYield:[""],
      eps:[""],
      marketCap:[""],
      roce:[""],
      reserves:[""],
      rocePreviousAnnum:[""],
      stockPE:[""]

    })
  })

  onSubmit(data:any){
    this.disable =true
    this.nseDetails =data
    this.companyDetails =[]
  }

  ngOnInit(): void {
  
    this.searchForm.valueChanges.subscribe(value=>{
      this.disable =false
      this.apiService.callApi(value.text).subscribe((data:any)=>{
        this.companyDetails =[]
        if(data){
         data.payload.forEach((element:any) => {
          this.companyDetails.push(element)
        });
        }
      },err=>{
        alert(err['error'].message)
        this.router.navigate(['login']);

      })
  })
  }

}
