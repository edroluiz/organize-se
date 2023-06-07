import { PopUpComponent } from './../pop-up/pop-up.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpCongratulationsComponent } from '../pop-up-congratulations/pop-up-congratulations.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string) {
    return this.dialog.open(PopUpComponent, {
      width: '500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data : {
        message: msg
      }
    });
  }

  openCongrutulationsDialog(msg: string) {
    return this.dialog.open(PopUpCongratulationsComponent, {
      width: '500px',
      panelClass: 'congrutulations-dialog-container',
      disableClose: true,
      data : {
        message: msg,
      },
    });
  }
}
