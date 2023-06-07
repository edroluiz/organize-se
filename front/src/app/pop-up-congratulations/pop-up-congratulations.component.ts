import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-pop-up-congratulations',
  templateUrl: './pop-up-congratulations.component.html',
  styleUrls: ['./pop-up-congratulations.component.css']
})
export class PopUpCongratulationsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopUpComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
