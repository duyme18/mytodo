import { CanActivateTeam } from './deactivate/can-activate-team';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoardAdminComponent } from './component/board-admin/board-admin.component';
import { BoardModeratorComponent } from './component/board-moderator/board-moderator.component';
import { BoardUserComponent } from './component/board-user/board-user.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { CoverComponent } from './template/cover/cover.component';
import { Permissions } from './deactivate/permissions';
import { NotActivateTeam } from './deactivate/not-activate-team';
import { IsAdmin } from './deactivate/is-admin';
import { UserListComponent } from './component/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    TodoListComponent,
    CoverComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [Permissions, CanActivateTeam, NotActivateTeam, IsAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
