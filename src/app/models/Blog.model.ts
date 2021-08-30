export class Blog{
    constructor(
        public id : number,
        public title : string,
        public content : string,
        public image : string,
        public date : number,
        public likes : number,
        public dislikes : number,
        public id_author : number
    ){}
}