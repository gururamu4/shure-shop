import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { product } from "../../app/models/product";

@Injectable({
  providedIn: "root"
})
export class Productservice {
  private ProductsUrl = "https://json-be-shure-shop.herokuapp.com/productList";
  constructor(private http: HttpClient) {}

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(this.ProductsUrl);
  }
  deleteCustomer(id){
    return this.http.delete(`${this.ProductsUrl}/${id}`)
  }
  getCustomerById(id){
    console.log(this.http.get(`${this.ProductsUrl}/${id}`));
   return this.http.get(`${this.ProductsUrl}/${id}`);
    //console.log()
  }
  createProduct(product){
    return this.http.post(this.ProductsUrl,product);
     //console.log()
   }
   updateCustomer(product: product): Observable<product> {
    return this.http.patch<product>(
      `${this.ProductsUrl}/${product.id}`,
      product
    );
  }
}
