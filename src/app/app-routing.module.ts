import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ErrorHandleComponent } from './error-handle/error-handle.component';

const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'user', component: UserComponent
  },
  {
    path: '**', component: ErrorHandleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
