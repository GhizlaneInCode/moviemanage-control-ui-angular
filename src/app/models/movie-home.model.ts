import { Director } from "./director.model";
import { MovieCover } from "./movie-cover.model";

export class MovieHome {

    id: number;
    title: string;
    description: string;
    releaseDate: string;
    originalLanguage: string;
    duration : number;
    director: Director;
    cover: MovieCover;


    

    constructor(id: number, title: string, description: string, releaseDate : string,originalLanguage: string , duration:number , director: Director, cover: MovieCover) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.releaseDate = releaseDate;
        this.originalLanguage = originalLanguage;
        this.duration = duration;
        this.director = director;
        this.cover = cover;
    }

}
