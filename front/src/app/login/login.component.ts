import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private loginService:LoginService,  private router: Router,) { }

  profileForm = this.fb.group({
    userName: ['batman'],
    password: ['iambatman'],
   
  });

  onSubmit(){
    this.loginService.callApi(this.profileForm.value).subscribe((data:any)=>{
      if(data){
        console.log(data["payload"].token)
        localStorage.setItem('token',data["payload"].token );
        this.router.navigate(['search']);
      }

 
  },err=>{
    console.log(err['error'].message)
    alert(err['error'].message)
    }
  )
  }

  ngOnInit(): void {
  }

}
