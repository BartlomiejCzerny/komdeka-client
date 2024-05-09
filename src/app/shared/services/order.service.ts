import { Observable } from 'rxjs';
import { Order } from './../../interfaces/order/order.interface';
import { EnvironmentUrlService } from './environment-url.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) { }

  getOrders(route: string): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  getOrder(route: string) {
    return this.http.get<Order>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  postOrder(route: string, body: any) {
    return this.http.post(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  putOrder(route: string, body: any) {
    return this.http.put(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  deleteOrder(route: string) {
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
