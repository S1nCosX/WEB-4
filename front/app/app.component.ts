import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Попов Андрей P32091 Вариант: 912345';

  logged = false
  constructor(public cookieService: CookieService, private router:Router) {
    this.logged = JSON.parse(<string>localStorage.getItem('isUserLoggedIn'));
  }
}
