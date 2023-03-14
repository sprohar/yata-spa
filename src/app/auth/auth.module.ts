import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authFeature } from '../store/reducers/auth.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(authFeature)],
})
export class AuthModule {}
