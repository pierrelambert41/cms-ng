import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Blogpost } from './models/blogpost';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  baseUrl = 'http://localhost:3000/api/v1/blog-posts';

  private blogpostCreated = new Subject<string>();

  constructor(
    private httpClient: HttpClient
  ) { }

  dispatchBlogpostCreated(id: string) {
    this.blogpostCreated.next(id);
  }

  handleBlogpostCreated() {
    return this.blogpostCreated.asObservable();
  }

  getBlogPosts(): Observable<Blogpost[]> {
    return this.httpClient.get<Blogpost[]>(this.baseUrl);
  }

  getBlogPostById(id): Observable<Blogpost> {
    return this.httpClient.get<Blogpost>(this.baseUrl + '/' + id);

  }

  deleteSingleBlogPost(id: string) {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }

  deleteBlogPosts(ids: string[]) {
    const allIds = ids.join(',');
    return this.httpClient.delete(this.baseUrl + '/?ids=' + allIds );
  }

  createBlogPost(blogpost: Blogpost) {
    return this.httpClient.post<Blogpost>(this.baseUrl, blogpost);
  }

  uploadImage(formData: FormData) {
    return this.httpClient.post<any>(this.baseUrl + '/images', formData);
  }
}
