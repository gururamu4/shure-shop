import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { order } from "../../app/models/order";

@Injectable({
  providedIn: "root"
})
export class orderService {
  private ordersUrl = "https://json-be-shure-shop.herokuapp.com/orders";
  constructor(private http: HttpClient) { }

  getOrders(): Observable<order[]> {
    return this.http.get<order[]>(this.ordersUrl);
  }
  deleteOrder(id) {
    return this.http.delete(`${this.ordersUrl}/${id}`)
  }
  getOrderById(id) {
    return this.http.get(`${this.ordersUrl}/${id}`);
  }
  createOrder(product) {
    return this.http.post(this.ordersUrl, product);
  }
  updateOrder(order: order): Observable<order> {
    return this.http.patch<order>(
      `${this.ordersUrl}/${order.id}`,
      order
    );
  }
}
