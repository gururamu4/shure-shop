import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { order } from "src/app/models/order";
import { Store, select } from "@ngrx/store";
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
    private store: Store<order>
  ) { }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  payments: string[] = ["amazonPay", "payPal", "Phonepe"];
  currentProduct;
  private routingParams;
  ngOnInit() {
    this.route.params.subscribe(value => {
      this.routingParams = value;
    });
    let cancelCart;
    this.store.pipe(select(fromOrders.getOrders)).subscribe(res => cancelCart = res)

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
    this.router.navigate(['my/orders']);
  }
}
