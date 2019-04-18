import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule, MatInputModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {JwtInterceptor} from './http-interceptor/jwt.interceptor';
import {ReaderGuard} from './guards/reader.guard';
import {UserGuard} from './guards/user.guard';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TodolisteComponent } from './todoliste/todoliste.component';
import { KanbanComponent } from './kanban/kanban.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { CreerKanbanComponent } from './creer-kanban/creer-kanban.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TodolisteComponent,
    KanbanComponent,
    FormulaireComponent,
    CreerKanbanComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [ReaderGuard, UserGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
