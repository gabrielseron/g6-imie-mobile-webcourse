import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartComponent } from '../../modals/cart/cart.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})

export class CoursesPage implements OnInit {

  constructor
  (
    private modal: ModalController
  ){ }

  ngOnInit() 
  {
    
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
