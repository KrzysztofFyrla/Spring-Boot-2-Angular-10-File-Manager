import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import {MaterialModule} from '../material.module';



@NgModule({
  declarations: [PageHeaderComponent],
  exports: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
