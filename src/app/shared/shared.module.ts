import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { QuestionComponent } from './question/question.component';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule} from "primeng/button";
import { HeaderComponent } from './header/header.component';
import { PaginatorModule } from 'primeng/paginator';
import { CategoryNamePipe } from './pipe/category-name/category-name.pipe';
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MenubarModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    ScoreComponent,
    QuestionComponent,
    TestComponent,
    PageNotFoundComponent,
    HeaderComponent,
    CategoryNamePipe
  ]
})
export class SharedModule {
}
