import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, subscribeOn, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { PATH } from "../app.constants";
import { SERVER_PATHS } from "../app.constants";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private router: Router) {}

  getUrl(url) {
    let API_URL;
    if (location.protocol == "http:") {
      if (window.location.hostname == "localhost"||window.location.hostname == "3.95.36.75") {
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
    console.log("request url---------->" + API_URL);
    return API_URL;
  }
  // Create

  postData(data, path): Observable<any> {
    let url = this.getUrl(path);
    return this.http.post(url, data).pipe(catchError(this.error.bind(this)));
  }

  // Read
  getData(path): Observable<any> {
    let url = this.getUrl(path);
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }

  // Read By ID
  getDataById(path, id): Observable<any> {
    let url = this.getUrl(path);
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }

  // Update
  updateData(data, path): Observable<any> {
    let url = this.getUrl(path);
    return this.http.put(url, data, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }
  patch(data, path): Observable<any> {
    let url = this.getUrl(path);
    return this.http
      .patch(url, data, { headers: this.headers })
      .pipe(catchError(this.error.bind(this)));
  }
  markInactive(path): Observable<any> {
    let url = this.getUrl(path);
    return this.http
      .put(url, {}, { headers: this.headers })
      .pipe(catchError(this.error.bind(this)));
  }

  // Delete
  deleteData(path): Observable<any> {
    let url = this.getUrl(path);
    return this.http.delete(url).pipe(catchError(this.error.bind(this)));
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    // let that=this;
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = { code: error.status, message: error.error.message };
    }
    // console.log(errorMessage);
    if (
      (errorMessage["code"] =
        401 && errorMessage["message"] == "Error: Unauthorized")
    ) {
      this.router.navigate(["/login"]);
    }
    return throwError(errorMessage);
  }
}
