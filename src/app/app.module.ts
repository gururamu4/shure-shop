import { ProductsShowComponent } from "./home/products-show/products-show.component";
import { HomeService } from "./services/home.service";
import { NavBarService } from "./bs-navbar/bs-navbar.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RoutingModule } from "./routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DatePipe } from "@angular/common";

import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule, MatToolbarModule, MatPaginatorModule, MatInputModule, MatFormFieldModule } from "@angular/material";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatBadgeModule } from "@angular/material/badge";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { GrdFilterPipe } from "./pipes/search.filter.pipe";

import { HttpModule } from "@angular/http";
import { NewProductComponent } from "./admin/admin-products/new-product/new-product.component";
import { SelectedComponent } from "./admin/admin-products/selected/selected.component";
import { RegisterComponent } from "./register/register.component";
import { AppComponent } from "./app.component";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { HomeComponent } from "./home/home.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { LoginComponent } from "./login/login.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { MyOrdersComponent } from "./admin/my-orders/my-orders.component";

import { StoreModule } from "@ngrx/store";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AuthService } from "./guard/auth.service";
import { AuthGaurdService } from "./guard/auth-gaurd.service";
import { AdminAuthGuard } from "./guard/admin.auth-gaurd.service";
import { AdminAuthService } from "src/app/guard/admin.auth.service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FooterComponent } from "./footer/footer.component";
import { StarRatingModule } from "angular-star-rating";
import { CancelOrderComponent } from "./admin/my-orders/cancel-order/cancel-order.component";
import { PaymentComponent } from "./check-out/payment/payment.component";
import { SignupService } from "./login/loginService.service";
import { HttpClientModule } from "@angular/common/http";


import { EffectsModule } from "@ngrx/effects";
import { productEffect } from "./store/products.effects";
import { productReducer } from "./store/products.reducer";
import { cartReducer } from "./store/cart.reducer";
import { cartEffect } from "./store/cart.effect";
import { orderEffect } from "./store/order.effect";
import { orderReducer } from "./store/order.reducer";
import { userEffect } from "./store/user.effect";
import { userReducer } from "./store/user.reducer";

@NgModule({
	declarations: [
		GrdFilterPipe,
		AppComponent,
		BsNavbarComponent,
		HomeComponent,
		ShoppingCartComponent,
		CheckOutComponent,
		OrderSuccessComponent,
		AdminProductsComponent,
		AdminOrdersComponent,
		LoginComponent,
		MyOrdersComponent,
		RegisterComponent,
		SelectedComponent,
		NewProductComponent,
		ProductsShowComponent,
		FooterComponent,
		CancelOrderComponent,
		PaymentComponent
	],
	imports: [
		HttpClientModule,
		HttpModule,
		MatSnackBarModule,
		MatSidenavModule,
		StarRatingModule,
		MatSliderModule,
		MatListModule,
		MatDividerModule,
		MatStepperModule,
		MatSlideToggleModule,
		MatSortModule,
		HttpModule,
		ReactiveFormsModule,
		MatPaginatorModule,
		MatBadgeModule,
		MatIconModule,
		MatMenuModule,
		MatTableModule,
		MatCardModule,
		BrowserModule,
		MatToolbarModule,
		MatButtonModule,
		NoopAnimationsModule,
		MatSelectModule,
		MatInputModule,
		BrowserAnimationsModule,
		FormsModule,
		MatGridListModule,
		MatFormFieldModule,
		StoreModule.forRoot({
			productList: productReducer,
			carts: cartReducer,
			userList: userReducer,
			orders: orderReducer
		}),
		StoreDevtoolsModule.instrument({}),
		EffectsModule.forRoot([
			productEffect,
			cartEffect,
			userEffect,
			orderEffect
		]),
		RoutingModule
	],

	providers: [
		SignupService,
		HomeComponent,
		BsNavbarComponent,
		HomeService,
		AuthGaurdService,
		AuthService,
		AdminAuthGuard,
		AdminAuthService,
		DatePipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
