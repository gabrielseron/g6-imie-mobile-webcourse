import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartComponent } from '../../modals/cart/cart.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FeedsService } from '../../services/feeds.service';
import { CourseFeed,ThemesFeed } from '../../interfaces/course-feed';
import{BehaviorSubject} from "rxjs";

import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
 
  feeds: CourseFeed[];
  themes:ThemesFeed[];
   //a mettre sur la page d'achat des cours
  //cart=[];
  //cartItemCount: BehaviorSubject<number>;
  constructor
    (
      private modal: ModalController, private router: Router, private route: ActivatedRoute, private feed: FeedsService, private platform: Platform, private storage: NativeStorage,
    ) { }


  async ngOnInit() {
    this.themes = await this.feed.getThemeBJson()

  }

  async FilterJSONData(ev: any) {
    this.feeds = await this.feed.getDataBJson()
    this.ionViewWillEnter();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.feeds = this.feeds.filter((feed) => {
        console.log(feed.nameCourse);
        return (feed.nameCourse.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


 

//get json data
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


//list of themes
iontheme() {


  this.router.events.subscribe(async (event) => {
    if (event instanceof NavigationEnd) {
      this.themes = (this.route.snapshot.data.json) ? await this.feed.getThemeBJson() : await this.feed.getThemeBJson();
      ;

    }
  });
}
  async displayCart() {
    const modal = await this.modal.create(
      {
        component: CartComponent
      });
    return await modal.present();
  }

}
