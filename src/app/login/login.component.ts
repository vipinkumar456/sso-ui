import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { AuthService } from "../services/auth.service";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: any = {
    password: "",
    username: "",
    otp: "",
    remember: true,
    captchaResponse:""
  };
  forgot: boolean = false;
  error: any;
  success: any;
  mobile:any="";
  showOtp:boolean=false;
  captchaData:any;
  notifications:any;
  smead;
  edw;
  reports;
  date = new Date();
  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService,
    private cookieService: CookieService,
    private messageService:MessageService
  ) {
    sessionStorage.removeItem("ssoUsername");
    sessionStorage.removeItem("ssoToken");
  }

  ngOnInit(): void {
    // if (localStorage.getItem("ssoUser")) {
    //   this.user = JSON.parse(localStorage.getItem("ssoUser"));
    // }
    this.getCaptcha();
    this.getNotifications();
  }

  getCaptcha(){
    this.httpService.getData(PATH.CAPTCHA).subscribe(
      (res) => {
        this.captchaData = res;
      })
  }

  getNotifications(){
    this.httpService.getData(PATH.NOTIFICATIONS).subscribe(
      (res) => {
        this.notifications = res;
        if(this.notifications){
          for(let dt of this.notifications){
            if(dt.name=='SMEAD'){
              this.smead = dt
            }
            if(dt.name=='EDW'){
              this.edw = dt
            }
            if(dt.name=='Reports/Users'){
              this.reports = dt
            }
          }
        }
      })
  }

  signIn(form: FormGroup) {
    this.error = "";
    form.controls["password"].setValidators([Validators.required]);
    form.controls["password"].updateValueAndValidity();
    form.markAllAsTouched();
    // if (form.invalid) return;
    this.user.captchaId = this.captchaData.id;
    if(this.user.password && this.user.username && this.user.captchaResponse){
    this.authService.login(this.user).subscribe(
      (res) => {
        console.log(res);
        sessionStorage.setItem("ssoToken", res["token"]);
        sessionStorage.setItem("ssoUsername", res["username"]);
        sessionStorage.setItem("ssoRoles", JSON.stringify(res["roles"]));
        // this.setCookie(res["token"])
        if (this.user.remember) {
          localStorage.setItem("ssoUser", JSON.stringify(this.user));
        }
        this.getLoginUser();
      },
      (error:HttpErrorResponse) => {
        let err:any = error;
        this.showOtp=false;
        if(err.message){
          if(err.message=='Maximum invalid attempts reached!! User locked'){
            this.error = 'Your password is locked, please try after 30 min!'
          }else{
            this.error = err.message;
          }
        }else{
          this.error = err.errors[0].message;
        }
        this.getCaptcha();
        this.user.captchaResponse = ""
    }
      // (err) => {
      //   this.error = err.message;
      //   this.getCaptcha();
      //   this.user.captchaResponse = ""
      // }
    );
    }else{
      this.error = "Please input the required field"
    }
  }
  sendEmail(form: FormGroup) {
    form.markAllAsTouched();
    form.markAsDirty();
    if (form.invalid) return;
    this.authService.forgot({ username: this.user.username }).subscribe(
      (res) => {
        this.success = "Email sent to your registered email";
      },
      (err) => {
        // this.success="Email sent to your registered email"
        this.error = err.errors[0].message;
      }
    );
  }
  getLoginUser() {
    // let username = sessionStorage.getItem('ssoUsername');
    this.httpService.getData(PATH.USER_DETAILS).subscribe((res) => {
      sessionStorage.setItem("ssoFullUser", JSON.stringify(res));
      this.router.navigate(["home"]);
    });
  }
  sendOtp(form: FormGroup) {
    this.error = "";
    form.markAllAsTouched();
    form.markAsDirty();
    if (form.invalid){
      this.error = "Please enter the User ID"
    }else{
    this.authService.otp({ username: this.user.username }).subscribe(
      (res) => {
        this.success = res.response;
        this.mobile=res.sentTo
        this.showOtp=true;
      },
      (error:HttpErrorResponse) => {
        let err:any = error;
        this.showOtp=false;
        if(err.message){
          if(err.message=='Mobile number not registered ! please contact administrator!'){
            this.error = "OTP sending failure, your mobile no details are not updated in HRMS, please update in HRMS"
          }else{
            this.error = err.message;
          }
        }else{
          this.error = err.errors[0].message;
        }
        // console.log(err);
    }
      // (err) => {
      //   this.showOtp=false;
      //   this.error = err.message;
      // }
    );
  }
  }
  validateOtp() {
    if(!this.user.otp){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please enter OTP" });
      return
    }
    this.authService
      .validateOtp({ otp: this.user.otp, username: this.user.username })
      .subscribe(
        (res) => {
          // this.success = "Email sent to your registered email";
          this.router.navigate(['reset/token',res.response])
        },
        (err) => {
          // this.success="Email sent to your registered email"
          this.error = err.message;
        }
      );
  }


  setCookie(key){
    this.cookieService.set( 'key', key);
  }

  
}
