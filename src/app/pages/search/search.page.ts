import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartComponent } from '../../modals/cart/cart.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FeedsService } from '../../services/feeds.service';
import { CourseFeed } from '../../interfaces/course-feed';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  feeds: CourseFeed[];
  constructor
    (
      private modal: ModalController, private router: Router, private route: ActivatedRoute, private feed: FeedsService, private platform: Platform, private storage: NativeStorage,
    ) { }


  async ngOnInit() {
    this.feeds = await this.feed.getDataBJson()
  }

  FilterJSONData(ev: any) {
    this.ionViewWillEnter();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.feeds = this.feeds.filter((feed) => {
        console.log(feed.nameCourse);
        return (feed.nameCourse.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }




  ionViewWillEnter() {
    

    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        this.feeds = (this.route.snapshot.data.json) ? await this.feed.getDataBJson() : await this.feed.getDataBJson();}
    });
  }

  async addToCart(idCourse: number)
  {
    console.log(this.feeds[idCourse]);
    if (this.platform.is("desktop"))
      {
        localStorage.setItem('course'+ idCourse + "id", JSON.stringify(this.feeds[idCourse]))
      } else
      {
        await this.storage.setItem('course'+ idCourse + "id", JSON.stringify(this.feeds[idCourse]))
      }

      console.log(this.feeds[0].id);
      
  }

selectVal(val)
{
  alert('you have selected : '+val);
}

  async displayCart() {
    const modal = await this.modal.create(
      {
        component: CartComponent
      });
    return await modal.present();
  }

}
