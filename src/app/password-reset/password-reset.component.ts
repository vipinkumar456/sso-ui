import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PATH } from '../app.constants';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  myForm: FormGroup
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router:Router,
    private httpService:HttpService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params.token){
        sessionStorage.setItem('ssoToken',params.token)
      }else{
        this.router.navigate(['/login'])
      }
    })
    this.myForm = this.fb.group({
      password: ['', [Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,19}")]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords })
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }
  saveUser(){
    let pass = this.myForm.get('password').value;
    let confirmPass = this.myForm.get('confirmPassword').value;
    if(this.myForm.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please enter valid password" });
    }
    if(this.myForm.valid){
      let dt=this.myForm.getRawValue()
      this.httpService.postData(dt, PATH.USER_RESET_PASSWORD).subscribe(res => {
        this.myForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Changed Successfully',life:7000 });
        setTimeout(()=>{
          this.router.navigate(['/login'])
        },7000)
        
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      })
      
    }
  }
}

