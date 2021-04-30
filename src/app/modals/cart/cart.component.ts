import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { FeedsService } from '../../services/feeds.service';
import { CourseFeed } from '../../interfaces/course-feed';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  isCartEmpty: boolean = true;
  private localStorageLength: number;
  public cartContent: CourseFeed[] =[]
  public cartContentKeys: string[] =[]
  deviceType;

  constructor
  (
    private modal: ModalController, private feed: FeedsService, private platform: Platform, private storage: NativeStorage,
  ){ }

  async ngOnInit()
  {
    this.findDeviceType()
    await this.getAddedCourses()
    //console.log(this.addedCourseList);
  }

  findDeviceType()
  {
    if (this.platform.is("desktop"))
      {
        this.deviceType = this.deviceType
      } else
      {
        this.deviceType = this.storage
      }
  }

  getAddedCourses()
  {
    this.localStorageLength = this.deviceType.length
    var i: number = 0
    while (i < this.localStorageLength) 
    {
      console.log(localStorage.key(i));
      if (this.deviceType.key(i).startsWith("TB_")) 
      {
        this.cartContentKeys.push(this.deviceType.key(i))
      }
      // this.cartContent.push(object)
      i++
    }
    console.log(this.cartContentKeys);
    var j: number = 0
    while (j < this.cartContentKeys.length) 
    {
      console.log(this.cartContentKeys[j]);
      console.log(JSON.parse(this.deviceType.getItem(this.cartContentKeys[j])));
      this.cartContent.push(JSON.parse(this.deviceType.getItem(this.cartContentKeys[j])))
      
      // console.log(JSON.parse(localStorage.getItem(this.cartContentKeys[j])).category.course.urlToImage);

      j++
    }
    console.log(this.cartContent);
  }

  async buyCourse()
    {
      for (let i = 0; i < this.cartContent.length; i++) 
      {
        await this.deviceType.setItem('BU_' + JSON.stringify(this.cartContent[i].name), JSON.stringify(this.cartContent[i]))
      }
      this.cartContentKeys.forEach(key => 
        {
          this.deviceType.removeItem(key);
      });
    }

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }
}
