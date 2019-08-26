import { Injectable } from '@angular/core';
import * as sha256 from 'js-sha256';


@Injectable({
  providedIn: 'root'
})
export class HasherService {

  constructor() { }

  hash(message) {
    return sha256.sha256(message).toUpperCase();
  }

  checkHash(message, goal) {
    let hashedMsg = this.hash(message);
    return  hashedMsg == goal;
  }
}
