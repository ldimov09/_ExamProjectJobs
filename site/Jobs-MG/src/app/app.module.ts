import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UserService } from './auth/user.service';
import { JobsModule } from './jobs/jobs.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
      UserService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        AuthModule,
        JobsModule
    ]
})
export class AppModule { }
