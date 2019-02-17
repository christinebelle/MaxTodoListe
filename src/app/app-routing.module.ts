import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodolisteComponent } from './todoliste/todoliste.component';
import { KanbanComponent } from './kanban/kanban.component';

const routes: Routes = [
  {path: 'todoliste', component: TodolisteComponent},
  {path: 'kanban', component: KanbanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
