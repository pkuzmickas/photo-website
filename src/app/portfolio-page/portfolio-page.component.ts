import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements AfterViewInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;


  menuPosition: number;
  menuHeight: number;
  categories = [
    'people', 'compositions', 'food', 'landscapes', 'other'
  ];

  sticky = false;

  curCategory = this.categories[0];
  prevCatTarget;

  modalOpened = false;
  modalPic;

  stdCols = 5;
  compCols = 3;

  data = [];
  fData = []; // formatted

  lastScrollTop;
  scrollDown = false;
  scrolledUpOnce = false;
  screenWidth = 0;
  modalHor = false;
  mNavbarOpen = false;
  windowScroll = window.pageYOffset;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }
  ngAfterViewInit(): void {
    const element = document.getElementById('first') as HTMLElement;
    this.prevCatTarget = element;
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
    this.menuHeight = this.menuElement.nativeElement.offsetHeight;
    this.lastScrollTop = this.menuPosition;
  }

  constructor(private http: HttpClient) {
    this.loadOrder(this.stdCols);
    this.onResize();
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    this.windowScroll = window.pageYOffset;
    if (!this.sticky && this.windowScroll > this.menuPosition + this.menuHeight) {
      this.sticky = true;
    } else if (this.windowScroll <= this.menuPosition) {
      this.scrolledUpOnce = false;
      this.sticky = false;
    }

    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > this.lastScrollTop) {
      this.scrollDown = true;
    } else {
      this.scrollDown = false;
      if (this.windowScroll > this.menuPosition + this.menuHeight) {
        this.scrolledUpOnce = true;
      }
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
    console.log(this.lastScrollTop);
    console.log(st);
    if (this.mNavbarOpen && this.sticky && !this.scrollDown) {
      this.mNavbarOpen = false;
    }

  }
  changeCat(cat, event) {
    let target = document.getElementById('scrollTarget');
    target.scrollIntoView();
    this.curCategory = this.categories[cat];
    if (cat === 1) { // compositions
      this.loadOrder(this.compCols);
    } else {
      this.loadOrder(this.stdCols);
    }

    event.target.classList.add('active'); // To ADD
    if (this.prevCatTarget) {
      this.prevCatTarget.classList.remove('active');
    }
    this.prevCatTarget = event.target;


    if (this.mNavbarOpen) {
      this.mNavbarOpen = false;
    }
  }

  openModal(pic, hor?) {
    this.modalOpened = true;
    this.modalPic = pic;
    if (hor) {
      this.modalHor = true;
    } else {
      this.modalHor = false;
    }
  }

  scroll() {
    let target = document.getElementById('startTarget');
    target.scrollIntoView();
  }

  loadOrder(cols) {
    this.http.get('assets/pics/' + this.curCategory + '/order.csv', { responseType: 'text' })
      .subscribe(
        data => {
          this.data = [];
          this.fData = [];
          data.split('\n').forEach(element => {
            if(element.includes(';')) {
              this.data.push(element.split(';'));
            } else if(element.includes(',')) {
              this.data.push(element.split(','));
            }
          });
          if (this.curCategory !== this.categories[1]) {
            for (let i = 0; i < this.data.length; i++) {
              const row = this.data[i];
              let firstRow = [];
              let secondRow = [];
              for (let j = 0; j < row.length; j++) {
                const pic = row[j];
                if (pic === '') {
                  break;
                }
                if (j < 3) {
                  firstRow.push(pic);
                } else {
                  secondRow.push(pic);
                }
              }
              this.fData.push([firstRow, secondRow]);
            }
          }
        },
        error => {
          console.log(error);
        }
      );

  }

}
