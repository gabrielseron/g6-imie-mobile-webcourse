import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: 
    [
      {
        path: 'home',
        children: [
        {
          path: '',
          data: { json: false },
          loadChildren: '../home/home.module#HomePageModule'
        }],
        data: { json: false },
      }, 
      {
        path: 'search',
        children: [
        {
          path: '',
          data: { json: true },
          loadChildren: '../search/search.module#SearchPageModule'
        }],
        data: { json: true },
      },
      {
        path: 'courses',
        children: [
        {
          path: '',
          data: { json: true },
          loadChildren: '../courses/courses.module#CoursesPageModule'
        }],
        data: { json: true },
      },
      {
        path: 'account',
        children: [
        {
          path: '',
          data: { json: true },
          loadChildren: '../account/account.module#AccountPageModule'
        }],
        data: { json: true },
      },
      {
        path: '',
        redirectTo: '/tab/home',
        pathMatch: 'full'
      }
    ]
    
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
