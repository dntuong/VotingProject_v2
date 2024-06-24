import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './layout/components/main/home/home.component';
import { CreateVotingComponent } from './layout/components/main/create-voting/create-voting.component';
import { DescriptionComponent } from './layout/components/main/Description/Description.component';
import { URL } from './constant/url.constant';
import { CHARACTER } from './constant/character.constant';
import { NotFoundComponent } from './layout/components/not-found/not-found.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ResultVotingComponent } from './layout/components/main/result-voting/result-voting.component';
import { StartVotingComponent } from './layout/components/main/start-voting/start-voting.component';
import { EditVotingComponent } from './layout/components/main/edit-voting/edit-voting.component';

const routes: Routes = [
  {path: URL.MAIN, pathMatch: 'full', redirectTo: URL.MAIN + CHARACTER.SLASH + URL.HOME},
  {path: URL.EMPTY, pathMatch: 'full', redirectTo: URL.MAIN + CHARACTER.SLASH + URL.HOME},
  {path: URL.MAIN, component: LayoutComponent,
    children: [
      {path: URL.HOME, component: HomeComponent},
      {path: URL.CREATE_VOTING, component: CreateVotingComponent},
      {path: URL.RESULT_VOTING, component: ResultVotingComponent},
      {path: URL.DESCRIPTION, component: DescriptionComponent},
      {path: URL.START_VOTING + '/:votingId', component: StartVotingComponent},
      {path: URL.EDIT_VOTING + '/:votingId', component: EditVotingComponent},
  ]},
  {path: URL.UPLOAD_FILE, component: FileUploadComponent},
  {path: URL.WILDCARD, component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
