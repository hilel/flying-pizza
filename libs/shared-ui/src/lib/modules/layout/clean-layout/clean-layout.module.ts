import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../components/header/header.module';
import { CleanLayoutComponent } from './clean-layout.component';

@NgModule({
  declarations: [CleanLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,

    HeaderModule
  ],
  exports: [CleanLayoutComponent]
})
export class CleanLayoutModule {}
