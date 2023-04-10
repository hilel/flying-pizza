 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditPizzaDlgComponent, IEditPizzaDlgData } from './edit-pizza-dlg.component';
import { IPizzaItem } from '@flying-pizza/model';
  
  @Injectable({
    providedIn: 'root',
  })
  export class EditPizzaDlgService {
    constructor(private http: HttpClient, private matDlg: MatDialog) {}
  
    async openEditPizzaDlg(editPizzaItem?: IPizzaItem): Promise<MatDialogRef<EditPizzaDlgComponent, IPizzaItem>> {
      const dlgConfig: MatDialogConfig<IEditPizzaDlgData> = {
        data: {
          pizza: editPizzaItem
        }
      };
      await import('./edit-pizza-dlg.component');
      return this.matDlg.open<
        EditPizzaDlgComponent, IEditPizzaDlgData, IPizzaItem
      >(EditPizzaDlgComponent, dlgConfig);
    }
  }