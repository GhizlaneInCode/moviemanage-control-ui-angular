import { Component, OnInit } from '@angular/core';
import { MovieHome } from 'src/app/models/movie-home.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  movies?: MovieHome[];

  searchTitle = "";

  page = 1;
  count = 0;
  pageSize = 8;


  
  constructor(private movieService : MovieService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(): void {
    this.movieService.getAllHome().subscribe(
      {
        next: (data) => {
          console.log(data);
          this.movies = data;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  delete(movie_id : number): void{
    this.movieService.delete(movie_id).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.movieService.getAllHome().subscribe(data =>{  
            this.movies =data  
            })  
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  pageChanged(event: any): void {
    this.page = event;
    this.getAllMoviesPagination();
  }
  getParams(page: number, pageSize: number, title: string) {
    let params: any = {};
    if (page) {
      params['page'] = page - 1;
    }
    if (pageSize) {
      params['size'] = pageSize;
    }

    if (title) {
      params['title'] = title;
    }

    return params;
  }
  getAllMoviesPagination(): void {
    const params = this.getParams(this.page, this.pageSize, this.searchTitle);
    this.movieService.getAllPagination(params).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.movies = data;
          const {content,totalElements} = data;
          this.movies = content;
          this.count=totalElements;
        }, error: (err) => {
          console.error(err);
        }
      }
      );
    }

confirmBox(movie_id : number){

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    timer: 15000,

    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
     
   
    allowOutsideClick: false
    
    
    
  }).then((result) => {
    if (result.isConfirmed) {

      this.delete(movie_id);

  
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
    
  })

}


}

  
