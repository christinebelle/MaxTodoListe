import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodolisteComponent } from './todoliste/todoliste.component';
import { KanbanComponent } from './kanban/kanban.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { CreerKanbanComponent } from './creer-kanban/creer-kanban.component';
import { UserGuard } from './guards/user.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'todoliste', component: TodolisteComponent, canActivate:[UserGuard]},
  {path: 'formulaire', component: FormulaireComponent, canActivate:[UserGuard]},
  {path: 'formulaire/:id', component: FormulaireComponent, canActivate:[UserGuard]},
  {path: '', component: KanbanComponent, canActivate:[UserGuard]},
  {path: 'formulaireTache', component: CreerKanbanComponent, canActivate:[UserGuard]},
  {path: '**', component: KanbanComponent, canActivate:[UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
