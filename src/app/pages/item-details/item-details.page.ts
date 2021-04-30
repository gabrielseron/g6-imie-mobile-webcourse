import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativeStorage, } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { FeedsService } from '../../services/feeds.service';
import { CourseFeed } from '../../interfaces/course-feed';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  public feeds: CourseFeed[];

  data: any;

  constructor(private modal: ModalController, private router: Router, private route: ActivatedRoute, private feed: FeedsService) { this.data = this.route.snapshot.paramMap.get("gp"); }

  async ngOnInit() {
   
    this.feeds = await this.feed.getDataBJson();
    console.log(this.data)
    console.log(this.feeds[parseInt(this.data)]);
    
     this.feeds.forEach(item => {

      if (item.id === this.data) {
        console.log(item.category)
        this.data = item;
  
      }
    })
  }
  

  //get json data
  ionViewWillEnter() {


    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        this.feeds = (this.route.snapshot.data.json) ? await this.feed.getDataBJson() : await this.feed.getDataBJson();
        console.log(this.feeds)
      }
    });
  }

}
