import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService } from "../../../services/home.service";
import { Product } from "src/app/models/products";
import { order } from "src/app/models/order";
import { Store,select } from "@ngrx/store";
import * as fromOrders from "../../../store/order.reducer";
import * as orderActions from '../../../store/order.action'


@Component({
  selector: "cancel-order",
  templateUrl: "./cancel-order.component.html",
  styleUrls: ["./cancel-order.component.css"]
})
export class CancelOrderComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private service: HomeService,
    private store:Store<order>
  ) {}
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  private payments:string[] = ["amazonPay", "payPal", "Phonepe"];
  private currentProduct;
  private routingParams;
  ngOnInit() {
    this.route.params.subscribe(value => {
      this.routingParams = value;
    });
    let cancelCart;
    this.store.pipe(select(fromOrders.getOrders)).subscribe(res=>cancelCart=res)
   
    for (let cart of cancelCart) {
      if (
        cart.pId == this.routingParams.id &&
        cart.delieveryDate == this.routingParams.date
      ) {
        this.currentProduct = cart;
      }
    }
    this.firstFormGroup = this._formBuilder.group({
      name: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ["", Validators.required],
      phone: ["", Validators.required],
      city: ["", Validators.required],
      pincode: ["", Validators.required],
      landmark: [""],
      star: [""]
    });
    this.thirdFormGroup = this._formBuilder.group({
      payment: ["", Validators.required]
    });
  }
  clicked = false;
  cancelOrder() {
    console.log(this.currentProduct)
    this.store.dispatch(new orderActions.DeleteOrder(this.currentProduct.id))
    alert('suuccess');
    this.router.navigate(['my/orders'])
    // let cart = JSON.parse(localStorage.getItem("cart1") || "[]");
    // let index;
    // let result = false;
    // for (let product of cart) {
    //   if (
    //     this.routingParams.id == product.pId &&
    //     this.routingParams.date == product.delieveryDate
    //   ) {
    //     result = true;
    //     index = cart.indexOf(product);
    //   }
    // }
    // if (result == true) {
    //   cart.splice(index, 1);
    //   localStorage.setItem("cart1", JSON.stringify(cart));
    //   alert("Refund Process Started");
    //   this.router.navigate([""]);
    // }
  }
}
