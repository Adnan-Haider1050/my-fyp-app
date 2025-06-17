import { Component,OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {

  images: string[] = [
    'assets/images/electiriction.jpg',
    'assets/images/ac.jpg',
    'assets/images/plumber1.jpg'
  ];

  currentImageIndex = 0;
  intervalId: any;

  get backgroundStyle() {
  return {
    'background-image': `url(${this.images[this.currentImageIndex]})`,
    'background-size': 'cover',
    'background-position': 'center',
    'transition': 'background-image 1s ease-in-out',
    'animation': 'fadeIn 1s ease-in-out'
  };
}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 10000); 
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
