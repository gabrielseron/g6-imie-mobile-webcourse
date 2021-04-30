import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartComponent } from '../../modals/cart/cart.component';
import { CourseFeed } from '../../interfaces/course-feed';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CoursePlayerComponent } from '../../modals/course-player/course-player.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})

export class CoursesPage implements OnInit {


  private localStorageLength: number
  public boughtCourses: CourseFeed[] =[]
  public boughtCoursesKeys: string[] =[]
  deviceType;

  constructor
  (
    private modal: ModalController,
    private platform: Platform, 
    private storage: NativeStorage,
  ){ }

  async ngOnInit() 
  {
    this.findDeviceType()    
    await this.getBoughtCourses()
  }

  findDeviceType()
  {
    if (this.platform.is("desktop"))
      {
        this.deviceType = localStorage
      } else
      {
        this.deviceType = this.storage
      }
  }

  getBoughtCourses()
  {
    this.localStorageLength = this.deviceType.length
    var i: number = 0
    while (i < this.localStorageLength) 
    {
      console.log(this.deviceType.key(i));
      if (this.deviceType.key(i).startsWith("BU_")) 
      {
        this.boughtCoursesKeys.push(this.deviceType.key(i))
      }
      // this.boughtCourses.push(object)
      i++
    }
    console.log(this.boughtCoursesKeys);
    var j: number = 0
    while (j < this.boughtCoursesKeys.length) 
    {
      console.log(this.boughtCoursesKeys[j]);
      console.log(JSON.parse(this.deviceType.getItem(this.boughtCoursesKeys[j])));
      this.boughtCourses.push(JSON.parse(this.deviceType.getItem(this.boughtCoursesKeys[j])))
      
      // console.log(JSON.parse(localStorage.getItem(this.boughtCoursesKeys[j])).category.course.urlToImage);

      j++
    }
    console.log(this.boughtCourses);
  }

  async displayCart()
  {
    const modal = await this.modal.create(
    {
      component: CartComponent
    });
    return await modal.present();
  }

  async openCourse()
  {
    const modal = await this.modal.create(
    {
      component: CoursePlayerComponent
    });
    return await modal.present();
  }

}
