import { Component, OnInit, Input } from '@angular/core';
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
  @Input() storageKeyCourse
  constructor
  (
    private modal: ModalController
  ) { }

  async ngOnInit()
  {
    this.title = "Insert Title";
    this.courseName = "Insert Course Name"
    this.description = "Insert Description"
    console.log(this.storageKeyCourse);
  }

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }
}
