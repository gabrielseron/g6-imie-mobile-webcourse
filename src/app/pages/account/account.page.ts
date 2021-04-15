import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartComponent } from '../../modals/cart/cart.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor
  (
    private modal: ModalController,
  ){}

  ngOnInit() {
  }

  async displayCart()
  {
    const modal = await this.modal.create(
    {
      component: CartComponent
    });
    return await modal.present();
  }

  changePic()
  {
    // script change photo from gallery or camera
  }

  openModalX()
  {
    // openModalOptionSelected
  }

}
