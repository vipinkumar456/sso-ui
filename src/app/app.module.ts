import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { HeaderComponent } from "./header/header.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { UserHeaderComponent } from "./user-header/user-header.component";
import { MenubarModule } from "primeng/menubar";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GapScreenComponent } from "./gap-screen/gap-screen.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimeNgModule } from "./primeng.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpService } from "./services/http.service";
import { AppInterceptor } from "./services/interceptor";
import { UserForm } from "./forms/user.form";
import { ReuseModule } from "./shared.module";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthGuard } from "./services/auth.gaurd";
import { AuthorizeGuard } from "./services/authorizr.service";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    HeaderComponent,
    UserHeaderComponent,
    GapScreenComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReuseModule,
    NgxSpinnerModule,
    PrimeNgModule,
  ],
  providers: [
    HttpService, CookieService,
    UserForm,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    AuthGuard,
    AuthorizeGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
