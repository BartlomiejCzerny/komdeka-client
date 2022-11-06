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

  types: Tool[] = [
    { type: 'Narzędzie mechaniczne' },
    { type: 'Narzędzie pomiarowe' },
    { type: 'Inne' }
  ]

  isMetrologicalService: Tool[] = [
    { isMetrologicalService: true, isMetrologicalServiceOption: 'Tak' },
    { isMetrologicalService: false, isMetrologicalServiceOption: 'Nie' }
  ]

  statuses: Tool[] = [
    { status: 'W użyciu' },
    { status: 'Wysłany do obsługi' },
    { status: 'Wycofany z użytkowania' }
  ]

  errorMessage = 'Narzędzie o podanym numerze identyfikacyjnym istnieje.';
  showError: boolean;
  hasMetrologicalService: boolean;

  constructor(private toolService: ToolService, public location: Location, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.toolForm = new FormGroup({
      idNumber: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      type: new FormControl('', [Validators.required]),
      serialNumber: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      isMetrologicalService: new FormControl('', [Validators.required]),
      metrologicalServiceInterval: new FormControl(''),
      lastMetrologicalService: new FormControl(),
      validUntil: new FormControl(),
      status: new FormControl('', [Validators.required])
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
      metrologicalServiceInterval: ((toolFormValue.lastMetrologicalService) != null && (toolFormValue.validUntil) != null)
                                  ? (toolFormValue.validUntil.getFullYear() - toolFormValue.lastMetrologicalService.getFullYear()).toString() + ' lat(a)' : '',
      lastMetrologicalService: toolFormValue.lastMetrologicalService,
      validUntil: toolFormValue.validUntil,
      status: toolFormValue.status
    };

    const apiUrl = 'api/tools';
    this.toolService.postTool(apiUrl, tool)
      .subscribe(() => {
        this.location.back();
        this.openToolAddSnackbar();
      },
      (() => {
        this.showError = true;
      })
    );
  }

  redirectToToolsList() {
    this.location.back();
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
