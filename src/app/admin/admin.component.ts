import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HasherService} from '../hasher.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  inputEntered: string;
  loggedIn = false;

  constructor(private http: HttpClient, private hasher: HasherService) {


  }

  checkPassword(password) {
    this.http.get('assets/password', {responseType: 'text'})
        .subscribe(data => {
           if(this.hasher.checkHash(password, data.slice(0, -1))) {
              this.loggedIn = true;
           }
        });
  }

  getData() {
    this.http.get('assets/file.csv', {responseType: 'text'})
    .subscribe(
        data => {
            console.log(data);
        },
        error => {
            console.log(error);
        }
    );
  }

}
