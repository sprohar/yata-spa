import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';
import { CreateTagDialogComponent } from './components/create-tag-dialog/create-tag-dialog.component';
import { EditTagDialogComponent } from './components/edit-tag-dialog/edit-tag-dialog.component';
import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';

@NgModule({
  declarations: [
    CreateTagDialogComponent,
    TagsComponent,
    EditTagDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    SharedModule,
    TagsRoutingModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
  ],
  providers: [],
})
export class TagsModule {}
