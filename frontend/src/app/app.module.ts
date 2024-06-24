import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { MenuComponent } from './layout/components/menu/menu.component';
import { NotFoundComponent } from './layout/components/not-found/not-found.component';
import { UploadFormComponent } from './file-upload/upload-form/upload-form.component';
import { UploadListComponent } from './file-upload/upload-list/upload-list.component';
import { UploadDetailsComponent } from './file-upload/upload-details/upload-details.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateVotingComponent } from './layout/components/main/create-voting/create-voting.component';
import { DescriptionComponent } from './layout/components/main/Description/Description.component';
import { HomeComponent } from './layout/components/main/home/home.component';
import { environment } from 'src/environments/environment';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarModule } from 'primeng/progressbar';
import { ResultVotingComponent } from './layout/components/main/result-voting/result-voting.component';
import { ChartModule } from 'primeng/chart';
import { UtilModule } from 'src/app/util/util.module';
import { StartVotingComponent } from './layout/components/main/start-voting/start-voting.component';
import { EditVotingComponent } from './layout/components/main/edit-voting/edit-voting.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenuComponent,
    NotFoundComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    FileUploadComponent,
    CreateVotingComponent,
    DescriptionComponent,
    HomeComponent,
    ResultVotingComponent,
    StartVotingComponent,
    EditVotingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    CalendarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    ChartModule,
    UtilModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
