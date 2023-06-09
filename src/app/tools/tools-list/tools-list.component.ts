import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Tool } from '../../interfaces/tool/tool.interface';
import { ToolService } from '../../shared/services/tool.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss'],
})
export class ToolsListComponent implements OnInit {
  isUserAdmin = false;

  searchKey: string;

  public displayedColumns = [
    'idNumber',
    'name',
    'type',
    'serialNumber',
    'isMetrologicalService',
    'metrologicalServiceInterval',
    'lastMetrologicalService',
    'validUntil',
    'status',
    'actions'
  ];

  toolsData = new MatTableDataSource<Tool>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private toolService: ToolService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getTools();
    if (this.authenticationService.isUserAdmin())
      this.isUserAdmin = true;
  }

  getTools() {
    this.toolService.getTool('api/tools')
    .subscribe(res => {
      this.toolsData.data = res as unknown as Tool[];
    });
  }

  ngAfterViewInit(): void {
    this.toolsData.sort = this.sort;
    this.toolsData.paginator = this.paginator;
  }

  applyFilter() {
    this.toolsData.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearchKey() {
    this.searchKey = '';
    this.applyFilter();
  }

  redirectToAdd() {
    this.router.navigate(['/tools/tool-add']);
  }

  redirectToDetails(id: any) {
    let url = `/tools/tool-details/${id}`;
    this.router.navigate([url]);
  }

  redirectToEdit(id: any) {
    let url = `/tools/tool-edit/${id}`;
    this.router.navigate([url]);
  }

  redirectToDelete(id: any) {
    let url = `/tools/tool-delete/${id}`;
    this.router.navigate([url]);
  }
}
