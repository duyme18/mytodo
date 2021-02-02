import { CoverComponent } from './template/cover/cover.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotActivateTeam } from './deactivate/not-activate-team';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotActivateTeam] },
  { path: 'register', component: RegisterComponent, canActivate: [NotActivateTeam] },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'todo', component: TodoListComponent },
  { path: '', component: CoverComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
