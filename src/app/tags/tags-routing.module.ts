import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { taggedTasksGuard } from './guards/tagged-tasks.guard';
import { TagsComponent } from './tags.component';

const routes: Route[] = [
  {
    path: ':tagId/tasks',
    component: TagsComponent,
    canActivate: [taggedTasksGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule { }
