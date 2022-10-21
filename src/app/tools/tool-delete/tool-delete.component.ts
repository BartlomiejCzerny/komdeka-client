import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { ToolService } from './../../shared/services/tool.service';
import { Tool } from './../../interfaces/tool/tool.interface';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tool-delete',
  templateUrl: './tool-delete.component.html',
  styleUrls: ['./tool-delete.component.scss']
})
export class ToolDeleteComponent implements OnInit {
  tool: Tool;

  constructor(
    private toolService: ToolService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
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
    .subscribe(res => {
      //this is temporary, until we create our dialogs
      // this.location.back();
      // this.matDialogRef.close();
      // this.router.navigate(['/tools/tools-list']);
      // this.location.back();
      // this.openToolAddSnackbar();
      console.log("Usunięto element");
    },
    (error => {
      //temporary as well
      // this.location.back();
      console.log("Błąd usuwania");
    })
  );
  }



}
