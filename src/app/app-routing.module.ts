import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginComponent } from "./login/login.component";
import { UserHeaderComponent } from "./user-header/user-header.component";
import { GapScreenComponent } from "./gap-screen/gap-screen.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { AuthGuard } from "./services/auth.gaurd";
import { AuthorizeGuard } from "./services/authorizr.service";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "",
    component: HeaderComponent,
    data: {
      title: "EDW Applications",
    },
    children: [
      {
        path: "login",
        component: LoginComponent,
        data: {
          title: "EDW Applications",
        },
      },
      {
        path: "reset/token/:token",
        component: PasswordResetComponent,
      },

      {
        path: "home",
        canActivate: [AuthorizeGuard],

        component: LandingPageComponent,
        data: {
          title: "EDW Applications",
        },
        canLoad: [AuthGuard],
      },
      {
        path: "gap",
        canActivate: [AuthorizeGuard],

        component: GapScreenComponent,
        canLoad: [AuthGuard],
        data: {
          roles: ["ROLE_GAP"],
        },
      },
      {
        path: "users",
        canActivate: [AuthorizeGuard],

        loadChildren: () =>
          import("./user-module/user.module").then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
