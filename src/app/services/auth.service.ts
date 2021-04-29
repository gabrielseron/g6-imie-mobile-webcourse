import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register';


@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  
  // online url
   url: string = "https://cericoil-14740.nodechef.com" 

  // offline url
 //url: string = "http://localhost:5233"
userName='';
password='';

  constructor
  (
    private http: HttpClient,
  ){ }

    register(user: UserRegister)
    { 
      console.log(user);
      return new Promise((resolve, rejects) => 
      {
        this.http.post(this.url +'/auth/register/', user).subscribe((data: any) => 
        {
          
            (!data.message) ? rejects(data.message): resolve(data);
        });
      });
    }

    


    login(userName: string, password: string) 
    {
      return new Promise((resolve, rejects) => {
     
       
          console.log(userName,password);
          this.http.post(this.url +'/auth/login/', { userName: userName, password: password}).subscribe((data: any) => {
              
          if (!data.token)
            rejects (data.message)
          else
            resolve (data)
          });
      });
  };

}
