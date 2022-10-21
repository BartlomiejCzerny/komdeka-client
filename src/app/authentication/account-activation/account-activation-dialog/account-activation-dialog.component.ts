import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-account-activation-dialog',
  templateUrl: './account-activation-dialog.component.html',
  styleUrls: ['./account-activation-dialog.component.scss'],
})
export class AccountActivationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AccountActivationDialogComponent>
  ) {}

  ngOnInit(): void {}
}
