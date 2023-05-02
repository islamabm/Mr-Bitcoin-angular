import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private manPhotos = [
    'https://images.pexels.com/photos/14564869/pexels-photo-14564869.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/12742567/pexels-photo-12742567.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/10370759/pexels-photo-10370759.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/14564834/pexels-photo-14564834.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11650772/pexels-photo-11650772.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/9607206/pexels-photo-9607206.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/15266243/pexels-photo-15266243.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7752805/pexels-photo-7752805.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7752846/pexels-photo-7752846.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11767210/pexels-photo-11767210.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/9271147/pexels-photo-9271147.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/15369537/pexels-photo-15369537.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6598207/pexels-photo-6598207.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png?auto=compress&cs=tinysrgb&w=600',
  ];

  private womanPhotos = [
    'https://images.pexels.com/photos/5193860/pexels-photo-5193860.png?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/10182234/pexels-photo-10182234.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2245383/pexels-photo-2245383.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2419574/pexels-photo-2419574.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3021538/pexels-photo-3021538.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/654696/pexels-photo-654696.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7515076/pexels-photo-7515076.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3718056/pexels-photo-3718056.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/10207449/pexels-photo-10207449.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7665702/pexels-photo-7665702.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/14566062/pexels-photo-14566062.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13548632/pexels-photo-13548632.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6497114/pexels-photo-6497114.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7077367/pexels-photo-7077367.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/9534280/pexels-photo-9534280.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13869717/pexels-photo-13869717.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8219320/pexels-photo-8219320.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/9489925/pexels-photo-9489925.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4814612/pexels-photo-4814612.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4085856/pexels-photo-4085856.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/10850706/pexels-photo-10850706.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];
  constructor() {}
  getPhoto(idx: number, sex: string): string {
    if (sex === 'men') return this.manPhotos[idx];
    return this.womanPhotos[idx];
  }
}
