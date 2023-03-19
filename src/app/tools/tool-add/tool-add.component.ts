import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Tool } from '../../interfaces/tool/tool.interface';
import { ToolService } from '../../shared/services/tool.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-add',
  templateUrl: './tool-add.component.html',
  styleUrls: ['./tool-add.component.scss']
})
export class ToolAddComponent implements OnInit {
  toolForm: UntypedFormGroup;

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

  errorMessage: string;
  showError: boolean;
  hasMetrologicalService: boolean;

  constructor(
    private toolService: ToolService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.toolForm = new UntypedFormGroup({
      idNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      name: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      type: new UntypedFormControl('', [
        Validators.required
      ]),
      serialNumber: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      isMetrologicalService: new UntypedFormControl('', [
        Validators.required
      ]),
      metrologicalServiceInterval: new UntypedFormControl(''),
      lastMetrologicalService: new UntypedFormControl(''),
      validUntil: new UntypedFormControl(''),
      status: new UntypedFormControl('', [
        Validators.required
      ])
    });
  }

  // public hasError(controlName: string, errorName: string) {
  //   return this.toolForm.controls[controlName].hasError(errorName);
  // }

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
      metrologicalServiceInterval: ((toolFormValue.lastMetrologicalService) != null && (toolFormValue.validUntil) != null && toolFormValue.isMetrologicalService !== false)
        ? (new Date(toolFormValue.validUntil).getFullYear() - new Date(toolFormValue.lastMetrologicalService).getFullYear()) == 1
          ? (new Date(toolFormValue.validUntil).getFullYear() - new Date(toolFormValue.lastMetrologicalService).getFullYear()).toString() + ' rok' : (new Date(toolFormValue.validUntil).getFullYear() - new Date(toolFormValue.lastMetrologicalService).getFullYear()) >= 2 && (new Date(toolFormValue.validUntil).getFullYear() - new Date(toolFormValue.lastMetrologicalService).getFullYear()) <= 4
            ? (new Date(toolFormValue.validUntil).getFullYear() - new Date(toolFormValue.lastMetrologicalService).getFullYear()).toString() + ' lata' : (new Date(toolFormValue.validUntil).getFullYear() - new Date(toolFormValue.lastMetrologicalService).getFullYear()) >= 5
              ? (new Date(toolFormValue.validUntil).getFullYear() - new Date(toolFormValue.lastMetrologicalService).getFullYear()).toString() + ' lat(a)' : 'Mniej niż 1 rok'
        : '',
      lastMetrologicalService: toolFormValue.isMetrologicalService === true ? toolFormValue.lastMetrologicalService : null,
      validUntil: toolFormValue.isMetrologicalService === true ? toolFormValue.validUntil : null,
      status: toolFormValue.status
    };

    const apiUrl = 'api/tools';
    this.toolService.postTool(apiUrl, tool)
      .subscribe(() => {
        this.redirectToToolsList();
        this.openToolAddSnackbar();
      },
        ((error) => {
          this.errorMessage = error;
          this.showError = true;
        })
      );
  }

  redirectToToolsList() {
    this.router.navigate(['/tools/tools-list']);
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
