import { Observable } from 'rxjs';
import { Tool } from '../../interfaces/tool/tool.interface';
import { EnvironmentUrlService } from './environment-url.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getTools(route: string): Observable<Tool[]> {
    return this.http.get<Tool[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  public getTool(route: string) {
    return this.http.get<Tool>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  public postTool(route: string, body: any) {
    return this.http.post(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  public putTool(route: string, body: any) {
    return this.http.put(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  public deleteTool(route: string) {
    return this.http.delete(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }
}
