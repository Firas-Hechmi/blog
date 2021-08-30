import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../models/Blog.model';
import { BlogsService } from '../services/blogs.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog=new Blog(0,"","","",0,0,0,0);
  firstName="";
  lastName="";
  constructor(private blogsService : BlogsService,
               private membersService: MembersService
              ,private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params['id'];
    this.blog=this.blogsService.findBlogById(+id);
    let publisher=this.membersService.getMemberById(this.blog.id_author);
    this.firstName=publisher.firstName;
    this.lastName=publisher.lastName;
  }
  back(){
    this.router.navigate(['/']);
  }
  onLike(){
    this.blog.likes++;
    this.blogsService.likeBlog(this.blog.id);
  }
  onDislike(){
    this.blog.dislikes++;
    this.blogsService.dislikeBlog(this.blog.id);
  }
  getColor(){
    if(this.blog.likes>this.blog.dislikes){
      return "lightgreen";
    }else if(this.blog.likes<this.blog.dislikes){
      return "lightcoral";
    }else{
      return "white";
    }
  }
}
