import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UserService } from './auth/user.service';
import { JobsModule } from './jobs/jobs.module';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { JobCatalogComponent } from './jobs/job-catalog/job-catalog.component';
import { CreateJobFormComponent } from './jobs/create-job-form/create-job-form.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        JobsModule,
        RouterModule.forRoot([
            {path:'', component: HomeComponent},
            {path:'login', component: LoginFormComponent},
            {path:'register', component: RegisterFormComponent},
            {path:'catalog', component: JobCatalogComponent},
            {path:'create', component: CreateJobFormComponent},
            {path:'catalog/:id', component: JobDetailsComponent},

        ])
    ]
})
export class AppModule { }
