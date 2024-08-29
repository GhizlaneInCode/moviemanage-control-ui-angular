import { Actor } from "./actor.model";
import { Categorie } from "./categorie.model";
import { Director } from "./director.model";
import { Image } from "./image.model";

export class Movie {

   
    title: string;
    description: string;
    releaseDate: string;
    originalLanguage: string;
    duration : number;
    director: Director;
    mvImages : Array<Image>;
    mvActors : Array<Actor>;
    mvCategories : Array<Categorie>;
    
    


    constructor(title:string , description:string , director:Director , releaseDate: string,  originalLanguage: string, duration : number){
        this.title = title;
        this.description = description;
        this.releaseDate = releaseDate;
        this.originalLanguage = originalLanguage
        this.duration = duration;
        this.director = director;
    }
}
