import { Injectable } from '@angular/core';
import {​​ HttpClient}​​ from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register';



@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  
  // online url
  // url: string = "https://cda-g6.eu-4.evennode.com" 

  // offline url
 url: string = "http://localhost:5233"
userName='';
password='';
  
  constructor
  (
    private http:HttpClient
  ){ }

    register(user: UserRegister)
    { 
      return new Promise((resolve, rejects) => 
      {
        this.http.post(this.url +'/auth/register', user).subscribe((data: any) => 
        {
            (!data.success) ? rejects(data.message): resolve(data);
        });
      });
    }


    login(userName: string, password: string) {
      return new Promise((resolve, rejects) => {
     
       
       console.log(userName,password);
          this.http.post(this.url +'/auth/login/', { userName: userName, password: password }).subscribe((data: any) => {
              
              (!data.success) ? rejects(false): resolve(data);
          });
      });
  }
}
