import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartComponent } from '../../modals/cart/cart.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor
  (
    private modal: ModalController
  ){ }

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

}
