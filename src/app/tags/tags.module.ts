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

@NgModule({
  declarations: [CreateTagDialogComponent, TagsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TagsRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class TagsModule { }
