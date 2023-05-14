import { NgModule } from '@angular/core';

import { CreateTagDialogComponent } from './components/create-tag-dialog/create-tag-dialog.component';
import { EditTagDialogComponent } from './components/edit-tag-dialog/edit-tag-dialog.component';
import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';

@NgModule({
  imports: [
    TagsRoutingModule,
    CreateTagDialogComponent,
    TagsComponent,
    EditTagDialogComponent,
  ],
  providers: [],
})
export class TagsModule {}
