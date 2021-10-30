
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizeGuard implements CanActivate {


  constructor(private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    if (sessionStorage.getItem('ssoToken')) {
        
        return true
        // if (route.data.roles&&userRoles) {
        //     // role not authorised so redirect to home page
        //     // this.router.navigate(['/']);
        //     // let interSect=route.data.roles.find(function(n) {
        //     //     return userRoles.find(r=>{
        //     //         return r.name===n;
        //     //     });
        //     // })
        //     const intersection = route.data.roles.filter(item1 => userRoles.some(item2 => item1 === item2.name))

        //     if(intersection.length>0){
        //         return true;
        //     }else{
        //         return false
        //     }
        // }
        // return true;
    }
    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}