import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

  blogpost$: Observable<Blogpost>;

  constructor(
    private blogpostService: BlogpostService,
    private activitedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activitedRoute.snapshot.paramMap.get('id');
    this.blogpost$ = this.blogpostService.getBlogPostById(id);
  }



}
