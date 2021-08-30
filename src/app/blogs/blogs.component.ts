import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empty, Subscription } from 'rxjs';
import { Blog } from '../models/Blog.model';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
    blogs: Blog[]=[];
    blogsSubscription : Subscription=empty().subscribe();
    constructor(private blogsService : BlogsService,private router : Router) { }

  ngOnInit(): void {
    this.blogsSubscription=this.blogsService.blogsSubject.subscribe(
      (blogs)=>{
        this.blogs=blogs;
      }
    )
    this.blogsService.blogsSubject.next(this.blogsService.blogs.slice());
    
  }
  ngOnDestroy(){
    this.blogsSubscription.unsubscribe();
  }

}
