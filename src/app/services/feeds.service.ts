import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseFeed, ThemesFeed} from '../interfaces/course-feed';
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
        for (let item of items) {
          courses.push({
            category:item.category,
            nameCourse: item.category.course.title,
            nameCategory:item.category.name,
            id:item.category.id,
            name: item.category.name,
            situation: item.category.course.situation
          })
        }
        console.log(courses);
        resolve(courses);
      })
    })
  }
  
  getThemeBJson(): Promise<ThemesFeed[]> {
    return new Promise((resolve, rejects) => {
      this.http.request('GET', '/assets/data/Course.json').subscribe((items: any) => {
        items = items.themes;
        console.log(items);
        let courses: ThemesFeed[] = []
        for (let item of items) {
          courses.push({
            name: item.name,
          })
        }
        console.log(courses);
        resolve(courses);
      })
    })
  }
}