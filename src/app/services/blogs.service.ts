import { Subject } from "rxjs";
import { Blog } from "../models/Blog.model";

export class BlogsService{
    blogsSubject=new Subject<Blog[]>();
     blogs : Blog[]=[
        new Blog(1,"Angular ","","assets/img.jpg",Date.now(),0,0,1),
        new Blog(2,"THE EARTH IS GROWING","","assets/theEarthIsGrowing.jpg",Date.now(),0,0,1),
        new Blog(3,"PERFECT MEMORY","","assets/perfectMemory.jpg",Date.now(),0,0,1),
        new Blog(4,"FROZEN FUTUR","","assets/frozenFutur.jpg",Date.now(),0,0,1),
        new Blog(5,"RAILROAD TIME","","assets/railRoadTime.jpg",Date.now(),0,0,1),
        new Blog(6,"THE ORIGINS OF COVID-19","","assets/covid.jpg",Date.now(),0,0,1),
        new Blog(7,"FACEBOOK IS TOXIC","","assets/facebook.jpg",Date.now(),0,0,1),
        new Blog(2,"PROBLEMS WITH BITCOIN","","assets/bitcoin.jpg",Date.now(),0,0,1)
     ];
    findBlogById(id :number): Blog{
        let blog=new Blog(0,"","","",0,0,0,0)
        let i=0;
        while(i<this.blogs.length){
             if(this.blogs[i].id===id){
                 return this.blogs[i];
             }else{
                 i++;
             }
        }
        return blog;
    }
    deleteBlogById(id : number){
        let i=0;
        let deleted=false;
        while(!deleted && i<this.blogs.length){
            if(this.blogs[i].id===id){
                this.blogs.splice(i,1);
                deleted=true;
            }else{
                i++;
            }
        }
    }
    updateBlog(blog : Blog){
        let i=0;
        let edited=false;
        while(!edited && i<this.blogs.length){
            if(this.blogs[i].id===blog.id){
                this.blogs[i]=blog;
                edited=true;
            }else{
                i++;
            }
        }
    }
    likeBlog(id : number){
        let i=0;
        let liked=false;
        while(!liked && i<this.blogs.length){
            if(this.blogs[i].id===id){
                this.blogs[i].likes++;
                liked=true;
            }else{
                i++;
            }
        }
    }
    dislikeBlog(id : number){
        let i=0;
        let disliked=false;
        while(!disliked && i<this.blogs.length){
            if(this.blogs[i].id===id){
                this.blogs[i].dislikes++;
                disliked=true;
            }else{
                i++;
            }
        }
    }
    search(word : string){
       let  results : Blog[]=[];
       for(let blog of this.blogs){
           if(blog.title.includes(word) || blog.content.includes(word)){
               results.push(blog);
           }
       } 
       this.blogsSubject.next(results); 
    }
}