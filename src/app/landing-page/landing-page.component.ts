import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { PATH, SERVER_PATHS } from "../app.constants";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  admin: boolean = false;
  role: any = {};
  display: boolean = false;
  error: boolean = false;
  sapPwd: string = "";
  constructor(
    private httpService: HttpService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isAdmin();
  }
  goto(link) {
    const token = sessionStorage.getItem("ssoToken");
    let API_URL;
    if (location.protocol == "http:") {
      if (window.location.hostname == "ssoedwdcap.edw.obc.co.in") {
        API_URL = "http://ssoedwdcap.edw.obc.co.in:8080/gap-ui/#/";
      } else if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "3.95.36.75"
      ) {
        //API_URL = "http://3.95.36.75:8016/gap-ui/#/";
         API_URL = "http://localhost:4300/gap-ui/#/";
      } else {
        API_URL = "http://172.16.15.223:8080/gap-ui/#/";
      }
    } else {
      if (window.location.hostname == "ssoedwdcap.edw.obc.co.in") {
        API_URL = "https://ssoedwdcap.edw.obc.co.in:8443/gap-ui/#/";
      } else if (window.location.hostname == "3.95.36.75") {
        API_URL = "https://3.95.36.75:8016/gap-ui/#/";
      } else {
        API_URL = "https://172.16.15.223:8443/gap-ui/#/";
      }
    }
    let url = API_URL + link + "/" + token;
    console.log(url);
    window.open(url);
    // window.open("http://3.95.36.75:8016/#/" + link + "/" + token);
  }
  gotoSap() {
    this.httpService.postData({}, PATH.SAP_URL).subscribe(
      (res) => {
        if (res.redirectUrl) {
          window.open(res.redirectUrl);
        } else {
          this.showDialog();
        }
      },
      (err) => {
        // console.log(err);
        this.showDialog();
        // this.messageService.add({
        //   severity: "error",
        //   summary: "Error",
        //   detail: err.message,
        // });
      }
    );
  }

  gotoRbs() {
    const token = sessionStorage.getItem("ssoToken");
    let API_URL;
    if (location.protocol == "http:") {
      if (window.location.hostname == "ssoedwdcap.edw.obc.co.in") {
        API_URL = "http://ssoedwdcap.edw.obc.co.in:8080/rbs-ui/#/";
      } else if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "3.95.36.75"
      ) {
        API_URL = "http://3.95.36.75:8110/#/home/";
        // API_URL = "http://localhost:4400/#/home/";
      } else {
        API_URL = "http://172.16.15.226:8080/rbs-ui/#/home/";
      }
    } else {
      // if (window.location.hostname == "ssoedwdcap.edw.obc.co.in") {
      //   API_URL = "https://ssoedwdcap.edw.obc.co.in:8443/rbs-ui/#/home";
      // } else 
      if (window.location.hostname == "3.95.36.75") {
        API_URL = "https://3.95.36.75:8016/rbs-ui/#/home";
      } else {
        API_URL = "http://172.16.15.226:8080/rbs-ui/#/home/";
      }
    }
    let url = API_URL + token;
    console.log(url);
    window.open(url);
   
  }

  updateSapPwd() {
    this.httpService
      .postData({}, PATH.SAP_PASSWORD_UPDATE + this.sapPwd)
      .subscribe(
        (res) => {
          // console.log(res)
          if (res.redirectUrl) {
            this.error = false;
            this.display = false;
            window.open(res.redirectUrl);
          } else {
            this.error = true;
            this.showDialog();
          }
        },
        (err) => {
          this.error = true;
        }
      );
  }
  isAdmin() {
    let roles = JSON.parse(sessionStorage.getItem("ssoRoles"));
    roles.map((o) => {
      if (o.name == "ROLE_ADMIN") {
        this.role.admin = true;
      }
      if (o.name == "ROLE_BO") {
        this.role.bo = true;
      }
      if (o.name == "ROLE_GAP") {
        this.role.gap = true;
      }
      if (o.name == "ROLE_RBS") {
        this.role.rbs = true;
      }
    });
  }
  showDialog() {
    this.display = true;
  }
  closeModal(){
    this.display = false;
  }
}
