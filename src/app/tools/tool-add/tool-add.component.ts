import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tool } from '../../interfaces/tool/tool.interface';
import { ToolService } from '../../shared/services/tool.service';

@Component({
  selector: 'app-tool-add',
  templateUrl: './tool-add.component.html',
  styleUrls: ['./tool-add.component.scss']
})
export class ToolAddComponent implements OnInit {
  toolForm: FormGroup;
  isMetrologicalService: boolean;

  constructor(private toolService: ToolService, public location: Location, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.toolForm = new FormGroup({
      idNumber: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      serialNumber: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      isMetrologicalService: new FormControl(false),
      // periodValidity: new FormControl('', [Validators.required]),
      metrologicalServiceInterval: new FormControl(''),
      lastMetrologicalService: new FormControl(''),
      validUntil: new FormControl(''),
      status: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });
  }

  public hasError(controlName: string, errorName: string) {
    return this.toolForm.controls[controlName].hasError(errorName);
  }

  public addTool(toolFormValue: any) {
    if (this.toolForm.valid) {
      this.executeToolAdding(toolFormValue);
    }
  }

  private executeToolAdding(toolFormValue: any) {
    const tool: Tool = {
      idNumber: toolFormValue.idNumber,
      name: toolFormValue.name,
      type: toolFormValue.type,
      serialNumber: toolFormValue.serialNumber,
      isMetrologicalService: toolFormValue.isMetrologicalService,
      // periodValidity: toolFormValue.periodValidity,
      metrologicalServiceInterval: toolFormValue.metrologicalServiceInterval,
      lastMetrologicalService: toolFormValue.lastMetrologicalService,
      validUntil: toolFormValue.validUntil,
      status: toolFormValue.status
    };

    const apiUrl = 'api/tools';
    this.toolService.postTool(apiUrl, tool)
      .subscribe(res => {
        //this is temporary, until we create our dialogs
        // this.location.back();
        // this.matDialogRef.close();
        // this.router.navigate(['/tools/tools-list']);
        this.location.back();
        this.openToolAddSnackbar();
      },
      (error => {
        //temporary as well
        // this.location.back();
      })
    );
  }

  resetToolForm() {
    this.toolForm.reset();
  }

  openToolAddSnackbar() {
    this.snackBar.open('Narzędzie zostało dodane pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
