import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit 
{

  @Input() emailer:string;
  isErrorMail: boolean = true;

  constructor(private modal: ModalController, private toast: ToastController) { }

  ngOnInit()
  {

  }

  emailCheck: string = '';

  checkEmail() 
  {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    // this.isErrorMail = !regex.test(this.email);
    console.log(this.emailCheck);
    console.log(regex.test(this.emailCheck.trim()));
    this.isErrorMail = (regex.test(this.emailCheck.trim())) ? false : true;
  }

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }

  async presentToast() 
  {
    const toast = await this.toast.create({
      message: 'A mail has been sent',
      duration: 2000,
      keyboardClose: true,
      cssClass: 'mailSentToast',
    });
    toast.present();
    this.close();
  }
}
