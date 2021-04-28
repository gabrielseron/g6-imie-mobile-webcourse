import { Injectable } from '@angular/core';
import {​​ HttpClient}​​ from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register';


@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
   url: string = "https://cericoil-14740.nodechef.com"

  constructor
  (
    private http: HttpClient
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

    


    login(userName: string, password: string) 
    {
      return new Promise((resolve, rejects) => {
     
       
          console.log(userName,password);
          this.http.post(this.url +'/auth/login/', { userName: userName, password: password}).subscribe((data: any) => {
              
          if (!data.token)
            rejects (false)
          else
            resolve (data)
          });
      });
  };

  loginer(userName:string, password:string)
  {
    return new Promise((resolve, rejects)=>
    {
      this.http.post(this.url + '/auth/login', {userName: userName, password: password}).subscribe((data: any)=>
      {
        console.log(data);
        if (!data.success)
            rejects (false)
        else
            resolve (data)
      });
    });
  };

}
