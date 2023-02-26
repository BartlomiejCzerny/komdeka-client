import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tool } from '../../interfaces/tool/tool.interface';
import { ToolService } from '../../shared/services/tool.service';

@Component({
  selector: 'app-tool-edit',
  templateUrl: './tool-edit.component.html',
  styleUrls: ['./tool-edit.component.scss']
})
export class ToolEditComponent implements OnInit {
  toolForm: FormGroup;
  tool: Tool;

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
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.toolForm = new FormGroup({
      idNumber: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      type: new FormControl('', [Validators.required]),
      serialNumber: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      isMetrologicalService: new FormControl('', [Validators.required]),
      metrologicalServiceInterval: new FormControl(''),
      lastMetrologicalService: new FormControl(''),
      validUntil: new FormControl(''),
      status: new FormControl('', [Validators.required])
    });

    this.getToolById();
  }

  public hasError(controlName: string, errorName: string) {
    return this.toolForm.controls[controlName].hasError(errorName);
  }

  private getToolById() {
    let toolId = this.activeRoute.snapshot.params['id'];
    let toolByIdUrl = `api/tools/${toolId}`;
    this.toolService.getTool(toolByIdUrl)
      .subscribe(res => {
        this.tool = res as Tool;
        this.toolForm.patchValue(this.tool);
      },
        ((error) => {
          this.errorMessage = error;
          this.showError = true;
        })
      );
  }

  public updateTool(toolFormValue: any) {
    if (this.toolForm.valid) {
      this.executeToolUpdate(toolFormValue);
    }
  }

  private executeToolUpdate(toolFormValue: any) {
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

    let apiUrl = `api/tools/${this.tool.idNumber}`;
    this.toolService.putTool(apiUrl, tool)
      .subscribe(() => {
        this.redirectToToolsList();
        this.openToolUpdateSnackbar();
      },
      ((error) => {
        this.errorMessage = error;
        this.showError = true;
      })
    )
  }

  redirectToToolsList() {
    this.router.navigate(['/tools/tools-list']);
  }

  resetToolForm() {
    this.toolForm.reset();
  }

  openToolUpdateSnackbar() {
    this.snackBar.open('Narzędzie zostało zaktualizowane pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
