import { Order } from './../../interfaces/order/order.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderForm: Order = new Order();
  readonly baseURL = 'http://localhost:5001/api/Order';
  list: Order[];

  constructor(private http: HttpClient) {}

  postOrder() {
    return this.http.post(this.baseURL, this.orderForm);
  }
  putOrder() {
    return this.http.put(
      `${this.baseURL}/${this.orderForm.orderNumber}`,
      this.orderForm
    );
  }
  deleteOrder(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http
      .get(this.baseURL)
      .toPromise()
      .then((res) => (this.list = res as Order[]));
  }
}
