import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';



@Component({
  selector: 'app-confirm-delete-data',
  templateUrl: './confirm-delete-data.component.html',
  styleUrls: ['./confirm-delete-data.component.scss'],
})


export class ConfirmDeleteDataComponent implements OnInit {

  message: string = "You don't have any courses"

  constructor
  (
    private PopoverController: PopoverController,
    private toast: ToastController,
    private platform: Platform,
    private storage: NativeStorage,
  ) { }

  ngOnInit() {}

  closePopover(){this.PopoverController.dismiss({'dismissed': true})}

  async deleteCoursesData()
  {

    if (this.platform.is("desktop"))
      {
        if (localStorage.getItem('course')) {
          await localStorage.removeItem('course');
          this.message = "Courses deleted"
        }else
        {
          this.message = "You don't have any courses"
        }
      } else
      {
        if (localStorage.getItem('course')) {
          await this.storage.remove('course');
          this.message = "Courses deleted"
        }else
        {
          this.message = "You don't have any courses"
        }
      }

    const toast = await this.toast.create(
      {
      message: this.message,
      duration: 2000
      });
  
      toast.present();
    this.closePopover()
  }
}
