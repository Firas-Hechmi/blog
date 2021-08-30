import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { BlogsComponent } from './blogs/blogs.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogsService } from './services/blogs.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MembersService } from './services/members.service';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './blog/blog.component';

const appRoutes : Routes=[
  {path:'blogs',component:BlogsComponent},
  {path :'blogs/:id',component:BlogComponent},
  {path:'profile',component:ProfileComponent},
  {path:'inscription',component:InscriptionComponent},
  {path:'login',component:LoginComponent},
  {path:'**',redirectTo:'blogs'}

]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    BlogsComponent,
    InscriptionComponent,
    ProfileComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    BlogsService,
    MembersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
