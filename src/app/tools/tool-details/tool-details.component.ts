import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { ToolService } from './../../shared/services/tool.service';
import { Tool } from './../../interfaces/tool/tool.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tool-details',
  templateUrl: './tool-details.component.html',
  styleUrls: ['./tool-details.component.scss']
})
export class ToolDetailsComponent implements OnInit {
  tool: Tool;

  constructor(
    private toolService: ToolService,
    private errorHandlerService: ErrorHandlerService,
    private location: Location,
    private activeRoute: ActivatedRoute,
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

  redirectToToolsList() {
    this.router.navigate(['/tools/tools-list']);
  }
}
