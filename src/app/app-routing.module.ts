import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodolisteComponent } from './todoliste/todoliste.component';
import { KanbanComponent } from './kanban/kanban.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { CreerKanbanComponent } from './creer-kanban/creer-kanban.component';

const routes: Routes = [
  {path: 'todoliste', component: TodolisteComponent},
  {path: 'formulaire', component: FormulaireComponent},
  {path: 'formulaire/:id', component: FormulaireComponent},
  {path: 'kanban', component: KanbanComponent},
  {path: 'formulaireTache', component: CreerKanbanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
