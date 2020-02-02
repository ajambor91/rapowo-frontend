import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent {
  textAgreement: boolean;
  constructor(public dialogRef: MatDialogRef<RulesComponent>) { }
  accepredRule(): void {
    const agreements = {
      text: this.textAgreement,
      rule: true
    };
    this.dialogRef.close(agreements);
  }
  disagreeRule(): void {
    this.dialogRef.close({rule: false});
  }
}
