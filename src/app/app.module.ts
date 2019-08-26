import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InquiriesFormComponent } from './inquiries-form/inquiries-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';


const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent },
  { path: 'admin', component:  AdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InquiriesFormComponent,
    LandingPageComponent,
    PortfolioPageComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
