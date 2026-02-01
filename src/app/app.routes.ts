import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:slug', component: PostDetailComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: 'admin/edit/:id', component: AdminComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
