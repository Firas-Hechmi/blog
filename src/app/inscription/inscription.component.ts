import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  inscriptionForm: any;
  constructor(private formBuilder : FormBuilder,
              private membersService: MembersService,
              private router : Router) { }
  ngOnInit(): void {
    this.inscriptionForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      gender:["",Validators.required],
      birthday:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    })
  }

  onSubmit(){
    let id : number;
    if(this.membersService.members.length>0){
      id=this.membersService.getIdLastMember()+1;
    }else{
      id=1;
    }
    let newMember=new Member(
      id,
      this.inscriptionForm.value['firstName'],
      this.inscriptionForm.value['lastName'],
      this.inscriptionForm.value['gender'],
      this.inscriptionForm.value['birthday'],
      this.inscriptionForm.value['email'],
      this.inscriptionForm.value['password']
    )
    this.membersService.addMember(newMember);
    console.log(this.membersService.members);
    this.router.navigate(['/login']);
  }
  back(){
    this.router.navigate(['/']);
  }

}
