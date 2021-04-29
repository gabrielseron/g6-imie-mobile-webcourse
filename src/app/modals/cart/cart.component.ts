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
  private localStorageLength: number
  constructor
  (
    private modal: ModalController, private feed: FeedsService, private platform: Platform, private storage: NativeStorage,
  ){ }

  ngOnInit()
  {
    this.getAddedCourses()
    //console.log(this.addedCourseList);
  }

  getAddedCourses()
  {
    this.localStorageLength = localStorage.length
    console.log(this.localStorageLength);
    
    for (let i = 0; i < this.localStorageLength; i++) 
    {
      console.log("id" + i);
      console.log(JSON.parse(localStorage.getItem('course' + i + 'id')));
      var a = (JSON.parse(localStorage.getItem('course' + i + 'id')))
      console.log(a.id);
      
      //localStorage.setItem("boughtCourseId", "1")
    }
  }



  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }
}
