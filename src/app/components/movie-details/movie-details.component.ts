import { Component, OnInit } from '@angular/core';
import { MaxValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCover } from 'src/app/models/movie-cover.model';
import { MovieHome } from 'src/app/models/movie-home.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

 // movie : MovieHome;
  
 movieCover:MovieHome;
 m: Movie = {
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

 images = [];

tempCat = [];
  

  constructor(private movieService : MovieService ,private route:ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.getMovieWithCover();
    this.getMovie();
  }

  getMovieWithCover(): void {
    this.movieService.getWithCover(Number.parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.movieCover = data;
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
          this.m = data;
          //this.images = data.mvImages;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
    
  }

deleteCat(cat_id: number){
  const movie_id = Number.parseInt(this.route.snapshot.paramMap.get("id"));
  this.movieService.deleteCategorie(movie_id,cat_id).subscribe(
    
    {
      next: (data) => {
        console.log(data);
        alert("Category N° : " + cat_id + " deleted successfully ");
        this.movieService.get(movie_id).subscribe(data =>{  
          this.m = data; 
          })  
      }, error: (err) => {
        console.error(err);
      }
    }
  );
   
  }
}

  


