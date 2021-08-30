import { Injectable } from "@angular/core";
import { fromEventPattern, Subject } from "rxjs";
import { Blog } from "../models/Blog.model";
import { Member } from "../models/Member.model";
import { BlogsService } from "./blogs.service";

@Injectable()
export class MembersService{
    constructor(private blogsService : BlogsService){}

    members=[new Member(1,"firas","hechmi","","","firas@gmail.com","a")];
    isConnectedSubject=new Subject<boolean>();
    connectedMemberSubject=new Subject<Member>();
    blogsConnectedMemberSubject=new Subject<Blog[]>();
    isConnected=false;
    private connectedMember=new Member(0,"","","","","","");
    private blogsConnectedMember : Blog[]=[];
    addMember(member : Member){
        this.members.push(member);
    }
    getIdLastMember(){
        return this.members[this.members.length-1].id;
    }
    connexion(email : string,password : string){
        
        let i=0;
        while(i<this.members.length && !this.isConnected){
            if(this.members[i].email===email){
               if(this.members[i].password===password){
                this.isConnected=true;
                this.connectedMember=this.members[i];
                for(let blog of this.blogsService.blogs){
                    if(blog.id_author===this.connectedMember.id){
                        this.blogsConnectedMember.push(blog);
                    }
                }
                this.emitIsConnectedSubjet();
                this.emitConnectedMemberSubject();
               }else{
                   i++;
               }
            }else{
                i++;
            }
        }
        return this.isConnected;
    }

    update(member : Member ){
       let done=false;
       let i=0;
       while(!done && i<this.members.length){
            if(this.members[i].id===member.id){
                this.members[i]=member;
                this.connectedMember=member;
                done=true;
                this.emitConnectedMemberSubject();
            }else{
                i++;
            }
       }   
    } 
    getMemberById(id : number){
        let memberNo=new Member(0,"","","","","","");
        for(let member of this.members){
              if(member.id===id){
                  return member;
              }
        }
        return memberNo;
    }
    search(word : string){
        let results : Blog[]=[];
        for(let blog of this.blogsConnectedMember){
            if(blog.title.toUpperCase().includes(word.toUpperCase()) || blog.content.toUpperCase().includes(word.toUpperCase())){
               results.push(blog);
            }
        }
        this.blogsConnectedMemberSubject.next(results);
    }
   
    deconnexion(){
        this.isConnected=false;
        this.connectedMember=new Member(0,"","","","","","")
        this.emitIsConnectedSubjet();   
    }

    emitIsConnectedSubjet(){
        this.isConnectedSubject.next(this.isConnected);
    }

    emitConnectedMemberSubject(){
        this.connectedMemberSubject.next(this.connectedMember);
    }
    emitBlogsConntedMemberSubject(){
        this.blogsConnectedMemberSubject.next(this.blogsConnectedMember.slice());
    }

}