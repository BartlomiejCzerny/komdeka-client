import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { ToolService } from './../../shared/services/tool.service';
import { Tool } from './../../interfaces/tool/tool.interface';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tool-delete',
  templateUrl: './tool-delete.component.html',
  styleUrls: ['./tool-delete.component.scss']
})
export class ToolDeleteComponent implements OnInit {
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

  constructor(
    private toolService: ToolService,
    private errorHandlerService: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getToolById();
  }

  private getToolById = () => {
    const toolId: string = this.activeRoute.snapshot.params['id'];
    const apiUri: string = `api/tools/${toolId}`;
    this.toolService.getTool(apiUri)
      .subscribe({
        next: (tool: Tool) => this.tool = tool,
        error: (err: HttpErrorResponse) => this.errorHandlerService.handleError(err)
      })
  }

  deleteTool() {
    const deleteUri: string = `api/tools/${this.tool.idNumber}`;
    this.toolService.deleteTool(deleteUri)
      .subscribe(() => {
        this.redirectToToolsList();
        this.openToolDeleteSnackbar();
      });
  }

  redirectToToolsList() {
    this.router.navigate(['/tools/tools-list']);
  }

  openToolDeleteSnackbar() {
    this.snackBar.open('Narzędzie zostało usunięte pomyślnie.', 'OK', {
      duration: 5000
    });
  }
}
