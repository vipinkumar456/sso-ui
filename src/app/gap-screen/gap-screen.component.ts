import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-gap-screen',
  templateUrl: './gap-screen.component.html',
  styleUrls: ['./gap-screen.component.scss']
})
export class GapScreenComponent implements OnInit {
  divisions:SelectItem[];
  reportNos:SelectItem[];
  reportNames:SelectItem[];
  
  logics:SelectItem[]=[ {label:'Select Logic', value:null},{label:"Yes",value:true},{label:"No",value:false}];
  minDateValue=new Date();
  compliance={
    "division": "",
    "lastReviewDate": "",
    "logicReviewDate": "",
    "logicValidated": "",
    "reportName": "",
    "reportNo": "",
    "userId": ""
  }
  constructor() { }

  ngOnInit(): void {
  }

}
