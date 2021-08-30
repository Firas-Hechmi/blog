import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription,empty} from 'rxjs';
import { Blog } from '../models/Blog.model';
import { Member } from '../models/Member.model';
import { BlogsService } from '../services/blogs.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  updateForm : any;
  blogForm : any;
  connectedMember : any;
  yourBlogs : Blog[]=[];
  edit={ disabled :true,
         id : 0,
         index : 0
        }

  connectedMemberSubscription : Subscription=empty().subscribe();
  blogsConnectedMemberSubscription : Subscription=empty().subscribe();

  constructor(private formBuilder :FormBuilder,
              private membersService : MembersService,
              private blogsService : BlogsService,
              private router : Router) { 
  }

  ngOnInit(): void {
    this.connectedMemberSubscription=this.membersService.connectedMemberSubject.subscribe(
      (connectedMember)=>{
        this.connectedMember=connectedMember;
        this.updateForm=this.formBuilder.group({
          firstName:[this.connectedMember.firstName,Validators.required],
          lastName:[this.connectedMember.lastName,Validators.required],
          gender:[this.connectedMember.gender,Validators.required],
          birthday:[this.connectedMember.birthday,Validators.required],
          email:[this.connectedMember.email,[Validators.required,Validators.email]],
          password:[this.connectedMember.password,Validators.required]
        })
      }
    );
    this.blogsConnectedMemberSubscription=this.membersService.blogsConnectedMemberSubject.subscribe(
      (yourBlogs)=>{
        this.yourBlogs=yourBlogs;
      }
    )
    this.membersService.emitConnectedMemberSubject();
    this.membersService.emitBlogsConntedMemberSubject();
    this.blogForm=this.formBuilder.group(
      {
        image:["assets/",Validators.required],
        title:["",Validators.required],
        content:["",Validators.required],

      }
    );
  }
  onUpdate(){
    let updatedMember=new Member(
      this.connectedMember.id,
      this.updateForm.value['firstName'],
      this.updateForm.value['lastName'],
      this.updateForm.value['gender'],
      this.updateForm.value['birthday'],
      this.updateForm.value['email'],
      this.updateForm.value['password']
      );
    this.membersService.update(updatedMember);
  }
  onSubmitBlogForm(){
    let image=this.blogForm.value['image'];
    let title=this.blogForm.value['title'];
    let content=this.blogForm.value['content'];
   if(this.edit.disabled){
    let id : number;
    let lengthBlogs=this.blogsService.blogs.length;
     if(lengthBlogs>0){
       id=this.blogsService.blogs[lengthBlogs-1].id+1;
     }else{
       id=1;
    }
    let newBlog=new Blog(
      id,
      title,
      content,
      image,
      Date.now(),
      0,
      0,
      this.connectedMember.id
    )
    this.blogsService.blogs.push(newBlog);
    this.yourBlogs.push(newBlog);
    console.log(this.blogsService.blogs);
    }else{
       this.yourBlogs[this.edit.index].image=image;
       this.yourBlogs[this.edit.index].title=title;
       this.yourBlogs[this.edit.index].content=content;
       this.blogsService.updateBlog(this.yourBlogs[this.edit.index]);
    }
    this.blogForm=this.formBuilder.group(
      {
        image:["assets/",Validators.required],
        title:["",Validators.required],
        content:["",Validators.required],

      }
    );
  }
  back(){
    this.router.navigate(['/']);
  }
  onDelete(id : number,index : number){
       this.blogsService.deleteBlogById(id);
       this.yourBlogs.splice(index,1);
  }
  onEdit(id : number, index : number){
     this.edit={
       disabled : false,
       id : id,
       index : index
     }
     this.blogForm=this.formBuilder.group(
      {
        image:[this.yourBlogs[this.edit.index].image,Validators.required],
        title:[this.yourBlogs[this.edit.index].title,Validators.required],
        content:[this.yourBlogs[this.edit.index].content,Validators.required],

      }
    );
  }
  onCancel(){
    this.edit={ disabled :true,
      id : 0,
      index : 0
     }
    this.blogForm=this.formBuilder.group(
      {
        image:["assets/",Validators.required],
        title:["",Validators.required],
        content:["",Validators.required],

      }
    );
  }
  ngOnDestroy(){
    this.connectedMemberSubscription.unsubscribe();
  }

}
