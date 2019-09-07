import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from "./admin/admin-products/new-product/new-product.component";
import { SelectedComponent } from "./admin/admin-products/selected/selected.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { LoginComponent } from "./login/login.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { MyOrdersComponent } from "./admin/my-orders/my-orders.component";
import { CancelOrderComponent } from "./admin/my-orders/cancel-order/cancel-order.component";
import { PaymentComponent } from "./check-out/payment/payment.component";
import { AuthGaurdService } from './guard/auth-gaurd.service';
import { AdminAuthGuard } from './guard/admin.auth-gaurd.service';
import { ProductsShowComponent } from './home/products-show/products-show.component';

const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "home", component: HomeComponent },
	{ path: "shopping-cart", component: ShoppingCartComponent },
	{ path: "order-success", component: OrderSuccessComponent },
	{ path: "login", component: LoginComponent },
	{
		path: "my/orders",
		component: MyOrdersComponent,
		canActivate: [AuthGaurdService]
	},
	{
		path: "my/orders/:id/:date",
		component: CancelOrderComponent,
		canActivate: [AuthGaurdService]
	},
	{
		path: "admin/orders",
		component: AdminOrdersComponent,
		canActivate: [AuthGaurdService && AdminAuthGuard]
	},

	{
		path: "admin/products",
		component: AdminProductsComponent,
		canActivate: [AuthGaurdService && AdminAuthGuard]
	}, {
		path: "check-out",
		component: CheckOutComponent,
		canActivate: [AuthGaurdService]
	},
	{
		path: "payment",
		component: PaymentComponent,
		canActivate: [AuthGaurdService]
	},
	{
		path: "admin/products/new",
		component: NewProductComponent,
		canActivate: [AuthGaurdService && AdminAuthGuard]
	},

	{
		path: "admin/products/:id",
		component: SelectedComponent,
		canActivate: [AuthGaurdService && AdminAuthGuard]
	},
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "products/:id", component: ProductsShowComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [
		RouterModule
	]
})
export class RoutingModule { };