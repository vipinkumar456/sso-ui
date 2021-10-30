import { NgModule } from '@angular/core';
import {UsersRoutingModule} from "./user-routing.module";
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PrimeNgModule } from '../primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReuseModule } from '../shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UsersComponent,UserEditComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReuseModule,
    UsersRoutingModule
  ]
})
export class UserModule { }
