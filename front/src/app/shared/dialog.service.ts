import { PopUpComponent } from './../pop-up/pop-up.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string) {
    return this.dialog.open(PopUpComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data : {
        message: msg
      }
    });
  }
}
