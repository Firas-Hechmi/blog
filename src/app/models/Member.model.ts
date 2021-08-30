import { Blog } from "./Blog.model";

export class Member{
    constructor(
        public id :number,
        public firstName : string,
        public lastName : string,
        public gender : string,
        public birthday : string,
        public email : string,
        public password : string,
        ){}
}