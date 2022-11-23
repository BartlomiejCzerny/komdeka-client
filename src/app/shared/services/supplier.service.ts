import { Observable } from 'rxjs';
import { Supplier } from './../../interfaces/supplier/supplier.interface';
import { EnvironmentUrlService } from './environment-url.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  public getSuppliers(route: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  public getSupplier(route: string) {
    return this.http.get<Supplier>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  public postSupplier(route: string, body: any) {
    return this.http.post(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  public putSupplier(route: string, body: any) {
    return this.http.put(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  public deleteSupplier(route: string) {
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
