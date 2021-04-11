import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  isCartEmpty: boolean = true;

  constructor
  (
    private modal: ModalController, 
  ){ }

  ngOnInit
  (

  ){ }

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }
}
