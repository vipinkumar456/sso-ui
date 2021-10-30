import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserForm } from 'src/app/forms/user.form';
import { HttpService } from 'src/app/services/http.service';
import { PATH } from "../../app.constants";
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  roles: Array<any> = [];
  userForm: FormGroup;
  username: string = "";
  disabled: boolean = false;
  currentRoute: string = ""
  constructor(private httpService: HttpService, private _userForm: UserForm, private fb: FormBuilder, private route: ActivatedRoute,
    private messageService: MessageService, private primengConfig: PrimeNGConfig, private router: Router) {
    this.userForm = this.fb.group(_userForm.getForm());
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getUserRoles();
    this.route.url.subscribe(res => {
      this.currentRoute = res[0].path;
      if (this.currentRoute == "profile") {
        this.getLoginUser()
      }
      if (this.currentRoute != "add") {
        this.userForm.controls['password'].clearValidators();
        this.userForm.controls['password'].setValidators(Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,19}"));
        this.userForm.controls['password'].updateValueAndValidity()
      }
      this.route.params.subscribe(params => {
        if (params.username) {
          this.username = params.username;
          this.disabled = true;

          this.getUser(params.username)

          

        }
      })
    });

  }
  getUser(username) {
    this.httpService.getData(PATH.GET_USER_BY_NAME + username).subscribe(res => {
      // console.log(res)
      this.userForm.patchValue(res);
      this.userForm.controls['firstName'].disable()
      this.userForm.controls['lastName'].disable()
      this.userForm.controls['branch'].disable()
      this.userForm.controls['cadre'].disable()
      this.userForm.controls['userName'].disable()
      // this.userForm.controls['email'].disable()
    })
  }
  getUserRoles() {
    this.httpService.getData(PATH.ROLES).subscribe(res => {
      this.roles = res;
    })
  }
  saveUser() {
    let dt = this.userForm.getRawValue()
    this.userForm.markAllAsTouched()
    if (this.userForm.invalid) { return true }
    if (this.currentRoute=="add") {
      this.httpService.postData(dt, PATH.USER).subscribe(res => {
        this.userForm.patchValue(res)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Created Successfully' });

        this.router.navigate(['users', 'edit', res.userName])
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      })
    } else if(this.currentRoute=="edit") {
      delete dt.id;
      dt.password==""?delete dt.password:null
      this.httpService.postData(dt, PATH.GET_USER_BY_NAME + this.username).subscribe(res => {
        this.userForm.patchValue(res)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
        
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      })
    }else{
      delete dt.id;
      dt.password==""?delete dt.password:null
      this.httpService.postData(dt, PATH.USER_RESET_PASSWORD).subscribe(res => {
        this.userForm.patchValue(res)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated Successfully' });
        // this.router.navigate(['users', 'edit', res.userName])
        if (this.username === res.userName) {
          this.getLoginUser()
        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      })
    }
  }
  getLoginUser() {
    this.httpService.getData(PATH.USER_DETAILS).subscribe(res => {
      this.userForm.patchValue(res)
      this.userForm.controls['firstName'].disable()
      this.userForm.controls['lastName'].disable()
      this.userForm.controls['branch'].disable()
      this.userForm.controls['cadre'].disable()
      this.userForm.controls['userName'].disable()
      this.userForm.controls['roles'].disable()
      sessionStorage.setItem('ssoRoles', JSON.stringify(res['roles']))
    })
  }

}
