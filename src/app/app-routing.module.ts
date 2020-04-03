import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminComponent } from './admin/admin.component';
import { BlogpostCreateComponent } from './blogpost-create/blogpost-create.component';


const routes: Routes = [
  { path: '', component: BlogpostListComponent },
  { path: 'blog-posts/:id', component: BlogpostComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/create', component: BlogpostCreateComponent },
  { path: '**', component: ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
