import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tool } from '../../interfaces/tool/tool.interface';
import { ToolService } from '../../shared/services/tool.service';


@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss'],
})
export class ToolsListComponent implements OnInit {
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
    'details',
    'edit',
    'deleting'
  ];

  public toolsData = new MatTableDataSource<Tool>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private toolService: ToolService, private router: Router) { }

  ngOnInit() {
    this.getTools();
  }

  public getTools() {
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

  public redirectToDetails(id: any) {
    let url = `/tools/tool-details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToEdit(id: any) {
    let url = `/tools/tool-edit/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDeleting(id: any) {
    let url = `/tools/tool-delete/${id}`;
    this.router.navigate([url]);
  }
}
