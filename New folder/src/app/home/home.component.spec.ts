// import { async, ComponentFixture, TestBed } from "@angular/core/testing";
// import { By } from "@angular/platform-browser";
// import { DebugElement } from "@angular/core";

// import { HomeComponent } from "./home.component";
// import { RouterTestingModule } from "@angular/router/testing";

// import { MatFormFieldModule } from "@angular/material";
// import { MatInputModule } from "@angular/material";
// import { MatSelectModule } from "@angular/material/select";
// import { MatMenuModule } from "@angular/material/menu";
// import { MatButtonModule, MatToolbarModule } from "@angular/material";
// import { MatCardModule } from "@angular/material/card";
// import { MatIconModule } from "@angular/material/icon";
// import { MatGridListModule } from "@angular/material/grid-list";
// import { MatTableModule } from "@angular/material/table";
// import { MatBadgeModule } from "@angular/material/badge";
// import { MatPaginatorModule } from "@angular/material";
// import { StoreModule } from "@ngrx/store";
// import { reducer } from "../store/products.reducer";
// import { HomeService } from "./../services/home.service";

// describe("HomeComponent", () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let service: HomeService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [HomeComponent],
//       imports: [
//         MatPaginatorModule,
//         MatBadgeModule,
//         MatIconModule,
//         RouterTestingModule,
//         MatMenuModule,
//         MatTableModule,
//         MatCardModule,
//         MatToolbarModule,
//         MatButtonModule,
//         MatSelectModule,
//         MatInputModule,
//         MatGridListModule,
//         MatFormFieldModule,
//         StoreModule.forRoot(reducer)
//       ]
//     });

//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     service = TestBed.get(HomeService);
//   });

//   it("should create component", () => {
//     expect(component).toBeDefined();
//   });
//   it("servc create service", () => {
//     expect(service).toBeDefined();
//   });
//   it("quantity should be greater than 0", () => {
//     const quantity = service.getQuantity();
//     expect(quantity).toBeGreaterThanOrEqual(0);
//   });

//   it("quantity of a particular product must work", () => {
//     const quantity: number = service.getQuantityProduct(0);
//     expect(quantity).toBeGreaterThanOrEqual(0);
//   });
//   it("should be added on clicking plus", () => {
//     let spy = spyOn(service, "plus");
//     const plus = service.plus("SM58");
//     expect(spy).toHaveBeenCalled();
//   });
//   it("should be reduced on minus function", () => {
//     let spy = spyOn(service, "minus");
//     const minus = service.minus(0);
//     expect(spy).toHaveBeenCalled();
//   });
// });
