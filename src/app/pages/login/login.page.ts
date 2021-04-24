import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordComponent } from '../../modals/forgot-password/forgot-password.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{
  userName: string='';
  mail: string = '';
  password: string = '';
  
  constructor
  (
    private modal: ModalController,
    private loading: LoadingController,
    private router: Router,
    private auth: AuthService,
    private platform: Platform,
    private storage: NativeStorage,
  ) {}

 async ngOnInit() 
  {
    let token;
        if (this.platform.is("desktop")) {
            token = localStorage.getItem('token')
        } else {
            token = await this.storage.getItem('token')
        }
        console.log(token);
        if (token !== undefined && token !== null)
            this.router.navigate(['/tab'])
  }

  async forgotPassword()
  {
    const modal = await this.modal.create(
      {
      component: ForgotPasswordComponent,
          componentProps: {
              'emailer': this.mail
          }
      });
      return await modal.present();
  }

  async loginForm() {
    const load = await this.loading.create({
        message: 'Please wait...',
        
    });
    await load.present();
    
   
    this.auth.login(this.userName,this.password ).then(async(user: any) => {
      
        console.log(this.platform.platforms());
        if (this.platform.is("desktop")) {
          console.log('err') 
          localStorage.setItem('token', user.token)
          localStorage.setItem('user', JSON.stringify(user.user))
      } else {
      
            await this.storage.setItem('token', user.token)
            await this.storage.setItem('user', JSON.stringify(user.user))
      }
        await this.loading.dismiss();
      
        this.router.navigate(['/tab'])
    }).catch(async() => {
        this.userName = ''
        this.password = '';
        await this.loading.dismiss();
    })
}

}
