import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';



@NgModule({
  declarations: [
    TaskPriorityPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
