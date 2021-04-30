import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { CartComponent } from '../../modals/cart/cart.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { ConfirmDeleteDataComponent } from '../../popover/confirm-delete-data/confirm-delete-data.component';
import { AboutComponent } from '../../popover/about/about.component';
import { IntelPropertyComponent } from '../../popover/intel-property/intel-property.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  username: string = ''

  constructor
  (
    private modal: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
    private router: Router,
    private popover: PopoverController
    ){}

  async ngOnInit() 
  {
    if (this.platform.is("desktop")) {
      this.username = localStorage.getItem('user')
    } else {
       this.username = await this.storage.getItem('user')
    }
    this.username = this.username.replace(/['"]+/g, '')
  }

  async displayCart()
  {
    const modal = await this.modal.create(
    {
      component: CartComponent
    });
    return await modal.present();
  }
  

  async intelProperty()
  {
    const popover = await this.popover.create(
      {
      component: IntelPropertyComponent,
      translucent: true
      }
      
    )
    return await popover.present();
  }

  async about()
  {
    const popover = await this.popover.create(
      {
      component: AboutComponent,
      translucent: true
      }
      
    )
    return await popover.present();
  }

  async deleteCourses()
  {
    const popover = await this.popover.create(
      {
      component: ConfirmDeleteDataComponent,
      translucent: true
      }
      
    )
    return await popover.present();
  }

  async logout()
  {
    if (this.platform.is("desktop"))
      {
        await localStorage.removeItem('token');
        await localStorage.removeItem('user');
        this.router.navigate(['/login']);
      } else
      {
        await this.storage.clear();
        this.router.navigate(['/login']);
      }
  }

}
