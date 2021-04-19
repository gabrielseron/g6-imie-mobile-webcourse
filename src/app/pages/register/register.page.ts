import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../../interfaces/user-register';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: UserRegister = {nom: '', email : '', password : '', confirm_Password : ''}

  constructor
  (
    private router: Router,
    private auth: AuthService,
    private loading: LoadingController,
    private toast: ToastController,
  ){ }

  isErrorMail: boolean = true

  ngOnInit()
  {

  }

  checkEmail() 
  {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    // this.isErrorMail = !regex.test(this.email);
    this.isErrorMail = (regex.test(this.user.email.trim())) ? false : true;
    console.log(this.isErrorMail);
  }

  async register()
  {
    const load = await this.loading.create(
    {
      message: 'Please wait...',
    });
    await load.present();

    this.auth.register(this.user).then(async(data) => {
      console.log(data);
      await this.loading.dismiss();
      this.router.navigate(['/login']);
  }).catch(async(err) => {
      console.log(err);
      const toast = await this.toast.create({
          message: err,
          duration: 2000
      });
      toast.present();
      await this.loading.dismiss();
  })
  }

}
