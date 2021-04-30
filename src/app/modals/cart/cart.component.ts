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

  constructor
  (
    private modal: ModalController, private feed: FeedsService, private platform: Platform, private storage: NativeStorage,
  ){ }

  async ngOnInit()
  {
    await this.getAddedCourses()
    //console.log(this.addedCourseList);
  }

  getAddedCourses()
  {
    this.localStorageLength = localStorage.length
    var i: number = 0
    while (i < this.localStorageLength) 
    {
      console.log(localStorage.key(i));
      if (localStorage.key(i).startsWith("TB_")) 
      {
        this.cartContentKeys.push(localStorage.key(i))
      }
      // this.cartContent.push(object)
      i++
    }
    console.log(this.cartContentKeys);
    var j: number = 0
    while (j < this.cartContentKeys.length) 
    {
      console.log(this.cartContentKeys[j]);
      console.log(JSON.parse(localStorage.getItem(this.cartContentKeys[j])));
      this.cartContent.push(JSON.parse(localStorage.getItem(this.cartContentKeys[j])))
 
     // this.cartContent[0].category.name

      // console.log(JSON.parse(localStorage.getItem(this.cartContentKeys[j])).category.course.urlToImage);
      j++
    }
   
         console.log(JSON.stringify(this.cartContent[0].name));
    
    // for (let i = 0; i < this.localStorageLength; i++) 
    // {
    //   console.log("id" + i);
    //   console.log(JSON.parse(localStorage.getItem('course' + i + 'id')));
    //   var a = (JSON.parse(localStorage.getItem('course' + i + 'id')))
    //   console.log(a.id);
      
    //   //localStorage.setItem("boughtCourseId", "1")
    // }
  }

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }
}
