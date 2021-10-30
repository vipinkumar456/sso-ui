import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { MenuItem } from "primeng/api";

@Component({
  selector: "app-user-header",
  templateUrl: "./user-header.component.html",
  styleUrls: ["./user-header.component.scss"],
})
export class UserHeaderComponent implements OnInit {
  items: MenuItem[];
  constructor(private router:Router) {}

  ngOnInit(): void {}
  user(){
    return sessionStorage.getItem('ssoUsername');
  }
  logout(){
    sessionStorage.removeItem('ssoUsername')
    sessionStorage.removeItem('ssoToken')
    this.router.navigate(['/login'])
  }
}
