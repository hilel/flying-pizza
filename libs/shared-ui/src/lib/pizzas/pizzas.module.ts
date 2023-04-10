import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { PizzasComponent } from './pizzas.component';
import { SpinnerModule } from '../modules/spinner/spinner.module';

const pizzasRoutes: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'prefix' },
  { path: 'list', component: PizzasComponent }
];

@NgModule({
  declarations: [PizzasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pizzasRoutes),
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,

    SpinnerModule
  ],
  exports: [
    RouterModule, MatTableModule
  ],
  providers: [
    { 
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: { 
        hasBackdrop: true,
        autoFocus: true,
        minWidth: '300px',
        minHeight: '500px',
      } as MatDialogConfig
    }
  ]
})
export class PizzasModule { }
