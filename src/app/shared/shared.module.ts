import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent, FooterComponent } from './layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageComponent, TableComponent } from './components';
import { SelectComponent } from './components/select/select.component';

import {ScrollingModule, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ScrollingModule,
    CdkVirtualScrollViewport
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    MessageComponent,
    TableComponent,
    SelectComponent,
    DialogComponent
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    TableComponent,
    SelectComponent,
    DialogComponent
  ]
})
export class SharedModule { }
