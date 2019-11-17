import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements AfterViewInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;

  menuPosition: any;

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

  ngAfterViewInit(): void {
    const element = document.getElementById('first') as HTMLElement;
    this.prevCatTarget = element;
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
    this.lastScrollTop = this.menuPosition;
  }

  constructor(private http: HttpClient) {
    this.loadOrder(this.stdCols);

  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll > this.menuPosition + 100) {
      this.sticky = true;
    } else if (windowScroll <= this.menuPosition) {
      this.scrolledUpOnce = false;
      this.sticky = false;
    }

    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > this.lastScrollTop) {
      this.scrollDown = true;
    } else {
      this.scrollDown = false;
      if (windowScroll > this.menuPosition + 100) {
        this.scrolledUpOnce = true;
      }
    }
    this.lastScrollTop = st <= 0 ? 0 : st;

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
    } // To Remove
    this.prevCatTarget = event.target;
  }

  openModal(pic) {
    this.modalOpened = true;
    this.modalPic = pic;
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
            this.data.push(element.split(';'));
          });
          console.log(this.data);
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
