import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empty, Subscription } from 'rxjs';
import { Member } from '../models/Member.model';
import { BlogsService } from '../services/blogs.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
   
  searchForm : any;
  
  isConnected=false;
  connectedMember=new Member(0,"","","","","","");

  isConnectedSubscription : Subscription=empty().subscribe();
  connectedMemberSubscription : Subscription=empty().subscribe();

  constructor(private membersService : MembersService,
              private router : Router,
              private formBuilder : FormBuilder,
              private blogsService :BlogsService) { 
   
  }

  ngOnInit(): void {
    this.isConnectedSubscription=this.membersService.isConnectedSubject.subscribe(
      (isConnected)=>{
        this.isConnected=isConnected;
      }
    )
    this.connectedMemberSubscription=this.membersService.connectedMemberSubject.subscribe(
      (connectedMember)=>{
        this.connectedMember=connectedMember;
      }
    );
    this.membersService.emitIsConnectedSubjet();
    this.membersService.emitConnectedMemberSubject();
    this.searchForm=this.formBuilder.group({
      searchWord :["",Validators.required]
    })
  }
   deconnexion(){
     this.membersService.deconnexion();
     this.router.navigate(['login']);
   }
   onSearch(){
     let currentUrl=this.router.url;
     if(currentUrl==='/blogs'){
      this.blogsService.search(this.searchForm.value['searchWord']);
     }else if(currentUrl==='blogs'){
      this.membersService.search(this.searchForm.value['searchWord']);
     }
     
   }
   ngOnDestroy(){
     this.connectedMemberSubscription.unsubscribe();
     this.isConnectedSubscription.unsubscribe();
   }
}
