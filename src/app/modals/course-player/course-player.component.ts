import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.scss'],
})
export class CoursePlayerComponent implements OnInit {

  private courseName: string 
  private description: string 
  private title: string 

  constructor
  (
    private modal: ModalController
  ) { }

  async ngOnInit()
  {
    this.title = "Insert Title";
    this.courseName = "Insert Course Name"
    this.description = "Insert Description"
  }

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }
}
