import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { EditJobFormComponent } from './jobs/edit-job-form/edit-job-form.component';
import { DemoComponent } from './demo/demo.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/logged.guard';
import { NotloggedGuard } from './auth/notlogged.guard';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        DemoComponent,
        NotFoundComponent,
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
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot([
            {path:'', component: HomeComponent},
            {path:'login', component: LoginFormComponent, canActivate: [NotloggedGuard]},
            {path:'register', component: RegisterFormComponent, canActivate: [NotloggedGuard]},
            {path:'catalog', component: JobCatalogComponent},
            {path:'create', component: CreateJobFormComponent, canActivate: [AuthGuard]},
            {path:'catalog/:id', component: JobDetailsComponent , canActivate: [AuthGuard]},
            {path:'catalog/edit/:id', component: EditJobFormComponent, canActivate: [AuthGuard]},
            {path:'demo', component: DemoComponent},
            {path: '**', pathMatch: 'full', component: NotFoundComponent }
        ])
    ]
})
export class AppModule { }
