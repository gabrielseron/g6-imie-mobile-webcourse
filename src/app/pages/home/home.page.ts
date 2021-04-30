import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CartComponent } from '../../modals/cart/cart.component';
import { FeedsService } from '../../services/feeds.service';
import { CourseFeed } from '../../interfaces/course-feed';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  feeds: CourseFeed[];
  constructor
  (private modal: ModalController, private router: Router, private route: ActivatedRoute, private feed: FeedsService){}

  async ngOnInit() {
    this.feeds = await this.feed.getDataBJson()
}

  ionViewWillEnter() {


    this.router.events.subscribe(async(event) => {
        if (event instanceof NavigationEnd) {
            this.feeds = (this.route.snapshot.data.json) ?await this.feed.getDataBJson():await this.feed.getDataBJson();
            ;
            
        }
    });


  }

 
  detail(idFeed){

    
    this.router.navigate(['/item-details/'+(JSON.stringify(idFeed.id))]);
  }

  async displayCart()
  {
    const modal = await this.modal.create(
    {
      component: CartComponent
    });
    return await modal.present();
  }
 option={
   slidesPerView:1.5,
   centeredSlides:true,
   loop:true,
 }

 
}
