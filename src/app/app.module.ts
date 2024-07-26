import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastModule,
        LoadingComponent,
    ],
    providers: [
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
