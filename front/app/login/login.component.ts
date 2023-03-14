import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //@ts-ignore
  email : string;
  //@ts-ignore
  password: string;

  constructor(private authService: AuthService, private router : Router) {

  }

  submit(is_login:boolean)
  {
    const type = (is_login ? 'login' : 'register');
    //@ts-ignore
    this.email = $(`#${type}_login`).val();
    //@ts-ignore
    this.password = $(`#${type}_password`).val();

    if (is_login)
      this.onLogin();
    else
      this.onRegister();

    return false;
  }

  isAuthorize() : boolean{
    //@ts-ignore
    return JSON.parse(localStorage.getItem('isUserLoggedIn'));
  }
  ngOnInit(): void {
    // this.isAuthorize();
    console.log(this.authService.isAuth);
  }

  onLogin(){
    // this.isAuthorize();
    const user = {
      email: this.email,
      password: this.password
    }
    this.authService.login(user).subscribe(isAuth =>{
      this.authService.isAuth = isAuth;
      localStorage.setItem('isUserLoggedIn', this.authService.isAuth ? "true" : "false");
      if(isAuth){
        localStorage.setItem('userName', this.email);
       // this.router.navigate(['/main']);
        $('#login').modal('hide');
      }
    })
  }
  onRegister(){
    const user = {
      email: this.email,
      password: this.password
    }
    this.authService.register(user).subscribe(isAuth =>{
      this.authService.isAuth = isAuth;
      localStorage.setItem('isUserLoggedIn', this.authService.isAuth ? "true" : "false");
      if(isAuth){
        localStorage.setItem('userName', this.email);
       // this.router.navigate(['/main']);
        $('#register').modal('hide');
      }
    })
  }
  onLogout(){
    this.authService.logout();
  }

}