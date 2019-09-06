import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class RegisterService {
    constructor() {
    }

   public RegisterNewUser(newUser):number{
    var userList=JSON.parse(localStorage.getItem("userList")||"[]");
    var user={
      id: Math.floor(Math.random() * 1000000),
      email:newUser.email,
      imgUrl: newUser.url,
      username:newUser.username,
      password:newUser.password,
      isAdmin:false
    };
    let beforeAdding=userList.length;
    userList.push(user);
    localStorage.setItem("userList",JSON.stringify(userList));
    let afterAdding=userList.length;
    if(beforeAdding==afterAdding){
        return 0;
    }
    else{
        return 1;
    }
    }
}