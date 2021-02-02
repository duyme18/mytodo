import { InboxComponent } from './component/inbox/inbox.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { CoverComponent } from './template/cover/cover.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotActivateTeam } from './deactivate/not-activate-team';
import { IsAdmin } from './deactivate/is-admin';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotActivateTeam] },
  { path: 'register', component: RegisterComponent, canActivate: [NotActivateTeam] },
  { path: 'users', component: UserListComponent, canActivate: [IsAdmin] },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'todo', component: TodoListComponent },
  { path: 'app', component: CoverComponent },
  { path: 'app/inbox', component: InboxComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
