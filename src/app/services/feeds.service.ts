import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseFeed } from '../interfaces/course-feed';
@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  constructor(private http: HttpClient) { }

  getDataBJson(): Promise<CourseFeed[]> {
    return new Promise((resolve, rejects) => {
      this.http.request('GET', '/assets/data/Course.json').subscribe((items: any) => {
        items = items.courses;
        console.log(items);
        let courses: CourseFeed[] = []
        for (const item of items) {
          courses.push({
            category:item.category,
            nameCourse: item.category.course.title,
            nameCategory:item.category.name
          })
        }
        console.log(courses);
        resolve(courses);
      })
    })
  }
}
