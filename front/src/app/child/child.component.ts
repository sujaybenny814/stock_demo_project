import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements  OnInit {


  @Input() companyData:any
  @Input() changeData:any
  companyDetails :any
  showData:Boolean = false
  constructor() { }

  ngOnInit(): void {
    console.log("ue")
  }





}
