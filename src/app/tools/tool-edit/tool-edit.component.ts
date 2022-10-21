import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
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

  public toolForm: FormGroup;
  public tool: Tool;

  constructor(
    private repository: RepositoryService,
    private toolService: ToolService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.toolForm = new FormGroup({
      idNumber: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      serialNumber: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      isMetrologicalService: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      metrologicalServiceInterval: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      lastMetrologicalService: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      validUntil: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      status: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });

    this.getToolById();
  }

  public hasError(controlName: string, errorName: string) {
    return this.toolForm.controls[controlName].hasError(errorName);
  }

  private getToolById() {
    let toolId = this.activeRoute.snapshot.params['id'];

    let toolByIdUrl = `api/tools/${toolId}`;

    this.repository.getData(toolByIdUrl)
      .subscribe(res => {
        this.tool = res as Tool;
        this.toolForm.patchValue(this.tool);
      },
      (error) => {
        // this.errorService.handleError(error);
      })
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
      metrologicalServiceInterval: toolFormValue.metrologicalServiceInterval,
      lastMetrologicalService: toolFormValue.lastMetrologicalService,
      validUntil: toolFormValue.validUntil,
      status: toolFormValue.status
    }

    let apiUrl = `api/tools/${this.tool.idNumber}`;
    this.toolService.putTool(apiUrl, tool)
      .subscribe(res => {
        // this.location.back();
      },
      (error => {

        // this.errorService.handleError(error);
      })
    )
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
