import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from "@angular/router";
import { map, filter } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  ssoUser: any = {};
  title: string = "EDW Applications";
  items = [
    {
      label: "My Profile",
      icon: "pi pi-user",
      command: () => {
        this.update();
      },
    },
    { label: "Branch :" + this.ssoUser["branch"], icon: "pi pi-sitemap" },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: () => {
        this.logout();
      },
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    if (sessionStorage.getItem("ssoFullUser")) {
      this.ssoUser = JSON.parse(sessionStorage.getItem("ssoFullUser"));
      this.items[1].label = "Branch : " + this.ssoUser["branch"];
      // this.items.splice(1, 0, { label: 'Branch :' + this.ssoUser['branch'], icon: 'pi pi-sitemap',command: null})
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        if (sessionStorage.getItem("ssoFullUser")) {
          this.ssoUser = JSON.parse(sessionStorage.getItem("ssoFullUser"));
          this.items[1].label = "Branch : " + this.ssoUser["branch"];
          // this.items.splice(1, 0, { label: 'Branch :' + this.ssoUser['branch'], icon: 'pi pi-sitemap',command: null})
        }
        if (data.state.root.firstChild.children[0].firstChild) {
          this.title =
            data.state.root.firstChild.children[0].firstChild.data.title;
        } else {
          this.title = data.state.root.firstChild.data.title;
        }
      }
    });
  }
  update() {
    this.router.navigate(["users", "profile"]);
  }
  logout() {
    this.authService.logout({}).subscribe((res) => {
      sessionStorage.removeItem("ssoUsername");
      sessionStorage.removeItem("ssoToken");
      this.router.navigate(["/login"]);
    });
  }
  user() {
    return sessionStorage.getItem("ssoUsername");
  }
}
