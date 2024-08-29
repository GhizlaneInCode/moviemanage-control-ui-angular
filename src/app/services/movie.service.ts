import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieHome } from '../models/movie-home.model';
import { Movie } from '../models/movie.model';
const baseUrl = 'http://localhost:8080/api/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }



  getWithCover(movie_id: number): Observable<MovieHome> {
    return this.httpClient.get<MovieHome>(`${baseUrl}/getWithCover/${movie_id}`);
  }

  get(movie_id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${baseUrl}/${movie_id}`);
  }

  delete(movie_id: number): Observable<MovieHome> {
    return this.httpClient.delete<MovieHome>(`${baseUrl}/${movie_id}`);
  }

  getAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(baseUrl);
  }

  getAllHome(): Observable<MovieHome[]> {
    return this.httpClient.get<MovieHome[]>(`${baseUrl}/home`);
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/add`, data);
  }

  uploadImage(file: File, movie_id: number, is_cover: boolean): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('is_cover', (is_cover) ? '1' : '0');

    const req = new HttpRequest('POST', `${baseUrl}/uploadFile/${movie_id}`, formData, {
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  update(movie_id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/update/${movie_id}`, data);
  }


  getAllPagination(params: any): Observable<any> {
    return this.httpClient.get<Movie[]>(`${baseUrl}/all`, { params });
  }

  deleteCategorie(movie_id: number, categ_id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/delete/${movie_id}/${categ_id}`);
  }


}
