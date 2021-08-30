import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm : any;
  error=false;
  constructor(private formBuilder:FormBuilder,
              private membersService : MembersService,
              private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }

  onSubmitForm(){
    let isConnected=this.membersService.connexion(this.loginForm.value['email'],this.loginForm.value['password']);
    if(isConnected){
       this.router.navigate(['/profile']);
    }else{
      this.error=true;
    }
  }
  back(){
    this.router.navigate(['/']);
  }

}
