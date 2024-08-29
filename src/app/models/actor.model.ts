export class Actor {

    id:number;
	firstName:string;
	lastName:string;
	age:number;
	photolink:string;

    constructor( firstName:string , lastName:string , age:number , photolink:string){
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.photolink = photolink;

    }
}
