import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { order } from "../../app/models/order";

@Injectable({
  providedIn: "root"
})
export class orderService {
  private ordersUrl = "https://json-be-shure-shop.herokuapp.com/orders";
  constructor(private http: HttpClient) {}

  getOrders(): Observable<order[]> {
    console.log('http',this.http.get(this.ordersUrl))
    return this.http.get<order[]>(this.ordersUrl);
  }
  deleteOrder(id){
    return this.http.delete(`${this.ordersUrl}/${id}`)
  }
  getOrderById(id){
    console.log(this.http.get(`${this.ordersUrl}/${id}`));
   return this.http.get(`${this.ordersUrl}/${id}`);
    //console.log()
  }
  createOrder(product){
    return this.http.post(this.ordersUrl,product);
     //console.log()
   }
   updateOrder(order: order): Observable<order> {
    return this.http.patch<order>(
      `${this.ordersUrl}/${order.id}`,
      order
    );
  }
}
