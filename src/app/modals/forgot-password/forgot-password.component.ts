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
  email: string = '';

  constructor(private modal: ModalController, private toast: ToastController) { }

  ngOnInit()
  {

  }


  checkEmail() 
  {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    // this.isErrorMail = !regex.test(this.email);
    console.log(this.emailer);
    console.log(regex.test(this.emailer.trim()));
    this.isErrorMail = (regex.test(this.emailer.trim())) ? false : true;
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
    this.checkEmail()
    if (this.isErrorMail == true) {
      const toast = await this.toast.create({
        message: 'Mail is incorrect',
        duration: 2000,
        keyboardClose: true,
        cssClass: 'mailSentToast',
      });
      toast.present();
    } else {
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
}