import {TestBed} from '@angular/core/testing';
import { RegisterComponent } from '../register/register.component';
import { RegisterService } from "./register.service";
describe('RegisterComponent',()=>{
 beforeEach(() => TestBed.configureTestingModule({

}));

it('should be created',()=>{
    const service:RegisterService=TestBed.get(RegisterService);
    expect(service).toBeTruthy();
});
it('should be registered',()=>{
    const service:RegisterService=TestBed.get(RegisterService);
    let spy=spyOn(service,'RegisterNewUser')
    const newUser=service.RegisterNewUser(null);
    expect(spy).toHaveBeenCalled();
})
});