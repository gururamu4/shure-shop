import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { cart } from "../../app/models/cart";

@Injectable({
  providedIn: "root"
})
export class cartService {
  private cartsUrl = "https://json-be-shure-shop.herokuapp.com/cart";
  constructor(private http: HttpClient) {}

  getCarts(): Observable<cart[]> {
    return this.http.get<cart[]>(this.cartsUrl);
  }
  deleteCart(id){
    return this.http.delete(`${this.cartsUrl}/${id}`)
  }
  getCartById(id){
   return this.http.get(`${this.cartsUrl}/${id}`);
  }
  createCart(product){
    return this.http.post(this.cartsUrl,product);
   }
   updateCart(cart: cart): Observable<cart> {
    return this.http.patch<cart>(
      `${this.cartsUrl}/${cart.id}`,
      cart
    );
  }
}
