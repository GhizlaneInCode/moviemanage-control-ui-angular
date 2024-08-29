import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Categorie } from 'src/app/models/categorie.model';
import { MovieHome } from 'src/app/models/movie-home.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  movieCover: File | null = null;
  movieSmallImage: File | null = null;
  coverPreview: string = "https://via.placeholder.com/200";
  smallImage: string = "https://via.placeholder.com/200";
 

  movieCover1:MovieHome;

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
 
    
  

  constructor(private movieService : MovieService , private router: Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    console.log("Hello")
    this.getMovieWithCover();
    this.getMovie();
    
  }

   movie_id:number = Number.parseInt(this.route.snapshot.paramMap.get("id"));


  

   /*showData(act){
    this.actors = act.mvActors;

   }*/


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

    
   getMovieWithCover(): void {
    this.movieService.getWithCover(Number.parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.movieCover1 = data;
          this.coverPreview = data.cover.link;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
    
  }


  getMovie(): void {
    this.movieService.get(Number.parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.movie = data;
          this.categories = data.mvCategories;
          this.actors = data.mvActors;
          //this.images = data.mvImages;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
    
  }


  //coverPreview: string = this.movieCover1.cover.link;

  updateMovie(): void {
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
    
    this.movieService.update(this.movie_id, data).subscribe(
      {
        next: (data) => {
          console.log(data);
          
          const movieId = this.movie_id;
          this.uploadCover(this.movieCover,movieId );
          this.uploadSmallImages(this.movieSmallImage,movieId)
          this.router.navigateByUrl(`/movie-details/${this.movie_id}`);
          
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
          this.router.navigateByUrl(`/movie-details/${this.movie_id}`);
        }
      }, (err: any) => {
        console.error(err);
      });

    } else {
      console.log("No File");
    }
  }

 
  selectSmallImage(event: Event): void {
    this.movieSmallImage = (event.target as HTMLInputElement).files.item(0);
    if ((event.target as HTMLInputElement).files.item(0)) {
      const reader = new FileReader();
      reader.onload = e => this.smallImage = reader.result.toString();

      reader.readAsDataURL((event.target as HTMLInputElement).files.item(0));
    }
  }


  uploadSmallImages(file: File, movie_id: number): void {
    if (file) {
      this.movieService.uploadImage(file, movie_id, false).subscribe((event: any) => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          this.router.navigateByUrl(`/movie-details/${this.movie_id}`);
        }
      }, (err: any) => {
        console.error(err);
      });

    } else {
      console.log("No File");
    }
  }


 
 


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
