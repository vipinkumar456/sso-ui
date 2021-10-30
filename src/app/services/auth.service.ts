import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";

import { PATH } from "../app.constants";
import { SERVER_PATHS } from "../app.constants";
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUrl(url) {
    let API_URL;
    if (location.protocol == "http:") {
      if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "3.95.36.75"
      ) {
        API_URL = SERVER_PATHS.LOCAL_HTTP + url;
      } else {
        window.location.hostname == "ssoedwdcap.edw.obc.co.in"
          ? (API_URL = SERVER_PATHS.PROD_HTTP + url)
          : (API_URL = SERVER_PATHS.DEV_HTTP + url);
      }
    } else {
      window.location.hostname == "172.16.15.223"
        ? (API_URL = SERVER_PATHS.DEV_HTTPS + url)
        : (API_URL = SERVER_PATHS.PROD_HTTPS + url);
    }
    return API_URL;
  }

  // SignIn
  login(data): Observable<any> {
    let url = this.getUrl(PATH.SIGNIN);
    console.log(SERVER_PATHS.LOCAL_HTTP + PATH.SIGNIN);
    return this.http.post(url, data).pipe(catchError(this.error));
  }

  // SignIn
  logout(data): Observable<any> {
    let url = this.getUrl(PATH.SIGN_OUT);
    console.log(SERVER_PATHS.LOCAL_HTTP + PATH.SIGN_OUT);
    return this.http.post(url, data).pipe(catchError(this.error));
  }

  // Forgot
  forgot(parameters): Observable<any> {
    let params = new HttpParams();
    Object.keys(parameters).forEach(function (key) {
      params = params.append(key, parameters[key]);
    });

    let url = this.getUrl(PATH.RESET_PASSWORD);
    return this.http.post(url, {}, { params: params }).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }

  getIpCliente(): Observable<string> {
    let headers=new HttpHeaders();
    headers.append('Access-Control-Allow-Origin',"GET")
    return this.http.get("http://api.ipify.org/?format=json",{headers:headers}).pipe(
      map((res: any) => {
        console.log("res ", res);
        console.log("res.json() ", res.text());
        //console.log('parseado ', JSON.parse(res.text()));
        console.log("parseado  stringify ", JSON.stringify(res.text()));
        let ipVar = res.text();
        let num = ipVar.indexOf(":");
        let num2 = ipVar.indexOf('"});');
        ipVar = ipVar.slice(num + 2, num2);
        console.log("ipVar -- ", ipVar);
        return ipVar;
      }),
      catchError(this.error.bind(this))
    ); // ...and calling .json() on the response to return data
    //.catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  otp(parameters): Observable<any> {
    let params = new HttpParams();
    Object.keys(parameters).forEach(function (key) {
      params = params.append(key, parameters[key]);
    });

    // let API_URL = `${SERVER_PATHS.DEV}${PATH.REQUEST_OTP}`;
    let url = this.getUrl(PATH.REQUEST_OTP);
    // return this.http.post(url, {}, { params: params }).pipe(
    return this.http.post(url, parameters).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }

  validateOtp(parameters): Observable<any> {
    let params = new HttpParams();
    Object.keys(parameters).forEach(function (key) {
      params = params.append(key, parameters[key]);
    });

    // let API_URL = `${SERVER_PATHS.DEV}${PATH.VALIDATE_OTP}`;
    let url = this.getUrl(PATH.VALIDATE_OTP);
    // return this.http.post(url, {}, { params: params }).pipe(
    return this.http.post(url, parameters).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(error.error ? error.error : errorMessage);
  }

  getCookie(key: string){
    return this.cookieService.get(key);
  }
  
}
