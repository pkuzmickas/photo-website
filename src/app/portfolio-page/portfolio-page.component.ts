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

  columns = [];
  ngAfterViewInit(): void {
    const element = document.getElementById('first') as HTMLElement;
    this.prevCatTarget = element;
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
  }

  constructor(private http: HttpClient) {
    this.loadOrder();

  }
  @HostListener('window:scroll', ['$event'])
    handleScroll() {
        const windowScroll = window.pageYOffset;
        if (windowScroll >= this.menuPosition) {
            this.sticky = true;
        } else {
            this.sticky = false;
        }
    }
  changeCat(cat, event) {
    console.log(this.prevCatTarget)
    this.curCategory = this.categories[cat];
    this.loadOrder();
    event.target.classList.add('active'); // To ADD
    if (this.prevCatTarget) {
      this.prevCatTarget.classList.remove('active');
    } // To Remove
    this.prevCatTarget = event.target;
    console.log(this.prevCatTarget.classList);
  }

  openModal(pic) {
    this.modalOpened = true;
    this.modalPic = pic;
  }

  scroll() {
    let target = document.getElementById('startTarget');
    target.scrollIntoView();
  }

  loadOrder() {
    this.http.get('assets/pics/' + this.curCategory + '/order.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let finalData = [];
          data.split('\n').forEach(element => {
            finalData.push(element.split(';'));
          });
          this.columns = [];
          for (let i = 0; i < finalData[0].length; i++) {
            let col = [];
            for (let j = 0; j < finalData.length; j++) {
              if (finalData[j][i]) {
                col.push(finalData[j][i]);
              }
            }
            this.columns.push(col);
          }
          console.log(this.columns)
        },
        error => {
          console.log(error);
        }
      );

  }

}
