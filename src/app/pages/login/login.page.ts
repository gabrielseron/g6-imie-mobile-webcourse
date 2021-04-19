import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ForgotPasswordComponent } from '../../modals/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{

  email: string = '';
  pass: string = '';

  constructor
  (
    private modal: ModalController,
    private loading: LoadingController,
    private router: Router,
  ) {}

  ngOnInit() 
  {

  }

  async forgotPassword()
  {
    const modal = await this.modal.create(
      {
      component: ForgotPasswordComponent,
          componentProps: {
              'emailer': this.email
          }
      });
      return await modal.present();
  }

  async loginForm()
  {
    const load = await this.loading.create(
      {
      message: 'Please wait...',
      });
      await load.present();
      
      //api code to connect
      await this.loading.dismiss();
      this.router.navigate(['/tab'])
  }

}
