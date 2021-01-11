import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material.module'; 

import { AuthPage } from './auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthPageRoutingModule,
    MaterialModule
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
