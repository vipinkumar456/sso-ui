

import { Injectable, Attribute } from "@angular/core";
import { Validators } from "@angular/forms";

@Injectable()
export class UserForm {
  getForm() {
    return {
      "branch": [""],
      "cadre": [""],
      "email": ["",[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      "firstName": ["", [Validators.required]],
      "lastName": ["", [Validators.required]],
      "phoneNumber": ["",[Validators.pattern('^([6-9]{1})([0-9]{9})$')]],
      "password": ["", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,19}")]],
      "roles": [null],
      "userName": ["", [Validators.required]],
      "id": [0]
    }
    // {
    //     "addressType": ["HOME"],
    //     "city": ["", [Validators.required, Validators.pattern(/^[a-zA-Z_ ]{1,100}$/)]],
    //     "houseNumber": ["", [Validators.required, Validators.pattern(/^.{1,100}$/)]],
    //     "id": [null],
    //     "landMark": ["", [Validators.required, Validators.pattern(/^.{1,100}$/)]],
    //     "pinCode": ["", [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]{5}$/)]],
    //     "state": ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9_ ]{1,100}$/)]],
    //     "street": ["", [Validators.required, Validators.pattern(/^.{1,100}$/)]],
    // }
  }
}
