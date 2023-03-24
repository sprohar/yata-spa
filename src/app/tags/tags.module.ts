import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTagDialogComponent } from './components/create-tag-dialog/create-tag-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TagsComponent } from './tags.component';
import { TagsRoutingModule } from './tags-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { tagsFeature } from '../store/reducers/tags.reducer';
import { TagsEffects } from '../store/effects';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditTagDialogComponent } from './components/edit-tag-dialog/edit-tag-dialog.component';
import { EffectsModule } from '@ngrx/effects';

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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature(tagsFeature),
    EffectsModule.forFeature([TagsEffects]),
  ],
  providers: [],
})
export class TagsModule {}
