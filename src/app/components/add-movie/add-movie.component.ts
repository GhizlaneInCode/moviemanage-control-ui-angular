import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Categorie } from 'src/app/models/categorie.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movieCover: File | null = null;
  coverPreview: string = "https://via.placeholder.com/200";

  movie: Movie = {
    title: '',
    description: '',
    releaseDate: '',
    originalLanguage: '',
    duration: 0,
    director: {
      name: '',
      phone: ''
    },
    mvImages: [],
    mvActors: [],
    mvCategories: []
  }

categorie:Categorie= {
  id: 0,
  name:'',
  description:'',
}

actor:Actor= {
  id: 0,
  firstName: '',
  lastName: '',
  age: 0,
  photolink: '',
}


categories = [];
actors = [];



  constructor(private movieService : MovieService , private router: Router) {}

  ngOnInit(): void {
    console.log(this.categorie)

  }

  saveCategorie(){
    if(this.categorie.name != '' && this.categorie.description != ''){

    this.categories.push(new Categorie(this.categorie.name , this.categorie.description));
    }
    else{
      alert(" the fields are empty !!!!!!! ");
    }
    this.categorie.name = '';
    this.categorie.description = '';
    return this.categories;
  }

 removeCatFromList(cat){
    const index = this.categories.indexOf(cat);
    //alert("index : " + index);
    this.categories.splice(index,1);
    return this.categories;
  }

  act_id = 0 ;
  saveActor(){

    if(this.actor.firstName != '' && this.actor.lastName != '' && this.actor.age != 0){
    this.actors.push(new Actor(this.actor.firstName , this.actor.lastName , this.actor.age , this.actor.photolink));
    }
    else{
      alert(" the fields are empty !!!!!!! ");
    }
    this.actor.firstName = '';
    this.actor.lastName = '';
    this.actor.age = 0;
    return this.actors;
  }

  

  removeActFromList(act){
    const index = this.actors.indexOf(act);
    this.actors.splice(index , 1);
    //alert("index : " + index);
    return this.actors;
  }



  saveMovie(): void {

   // this.categories.push(this.categorie);
    //this.actors.push(this.actor);

    const data = {
      title: this.movie.title,
      description: this.movie.description,
      releaseDate: this.movie.releaseDate,
      originalLanguage: this.movie.originalLanguage,
      duration: this.movie.duration,
      director: this.movie.director,
      mvCategories: this.categories,
      mvActors: this.actors
      
      
    }
    
    this.movieService.create(data).subscribe(
      {
        next: (data) => {
          console.log(data);
          const movieId = data.id;
          this.uploadCover(this.movieCover,movieId );
          this.router.navigateByUrl("/movies");
          
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  selectImage(event: Event): void {
    this.movieCover = (event.target as HTMLInputElement).files.item(0);
    if ((event.target as HTMLInputElement).files.item(0)) {
      const reader = new FileReader();
      reader.onload = e => this.coverPreview = reader.result.toString();

      reader.readAsDataURL((event.target as HTMLInputElement).files.item(0));
    }
  }

  uploadCover(file: File, movie_id: number): void {
    if (file) {
      this.movieService.uploadImage(file, movie_id, true).subscribe((event: any) => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          this.router.navigateByUrl("/movies");
        }
      }, (err: any) => {
        console.error(err);
      });

    } else {
      console.log("No File");
    }
  }


 
 // displayStyle = "none";
  displayAct = "none";
  displayCat = "none";
  
  openCategoryPopup() {
    this.displayCat = "block";
  }

  openActorPopup() {
    this.displayAct = "block";
  }

  closePopup() {
    //this.displayStyle = "none";
    this.displayAct = "none";
    this.displayCat = "none";
  }

}
