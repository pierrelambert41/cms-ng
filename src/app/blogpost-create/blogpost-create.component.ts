import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { BlogpostService } from '../blogpost.service';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {

  creationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogpostService: BlogpostService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.initCreationForm();
  }

  initCreationForm() {
    this.creationForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      content: '',
      image: ''
    });
  }

  upload() {
    const inputEL: HTMLInputElement = this.elementRef.nativeElement.querySelector('#image');
    const fileCount: number = inputEL.files.length;
    if (fileCount > 0) {
      let formData = new FormData();
      formData.append('image', inputEL.files.item(0));
      this.blogpostService.uploadImage(formData).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.error(err);
        }
      )
    }
  }

  onSubmitBlogpost(formDirective: FormGroupDirective) {
    this.blogpostService.createBlogPost(this.creationForm.value).subscribe(
      (data) => {
        this.handleSuccess(data, formDirective);
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  handleSuccess(data, formDirective) {
    this.creationForm.reset();
    formDirective.resetForm();
    this.blogpostService.dispatchBlogpostCreated(data);
  }

  handleError(error) {
    console.error('Un probleme lors du post des données', error);
  }
}
