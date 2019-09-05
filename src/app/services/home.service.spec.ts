import { TestBed } from '@angular/core/testing';
//import { Observable,from } from "rxjs";
import { HomeComponent } from '../home/home.component';
import { HomeService } from '../services/home.service';
import { StoreModule } from '@ngrx/store';
import { productReducer } from 'src/app/store/products.reducer';

describe('HomeService', () => {
  let service:HomeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot(productReducer)
      ]
    })
    service=TestBed.get(HomeService)
  }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('get quantity should be not negative', () => {
  //   // const service: HomeService = TestBed.get(HomeService);
  //   const g = service.getQuantity();

  //   expect(g).toBeGreaterThanOrEqual(0);
  // })

  // it('quanity of plus or minus display', () => {
  //   // const service: HomeService = TestBed.get(HomeService);
  //   const quantity = service.getQuantityProduct('SM58');
  //   expect(quantity).toBeGreaterThanOrEqual(0);
  // })

  // it('it should be added on clicking plus', () => {

  //   // const service: HomeService = TestBed.get(HomeService);
  //   let spy = spyOn(service, 'plus');
  //   const d = service.plus('SM58');

  //   expect(spy).toHaveBeenCalled();
  // })
});
