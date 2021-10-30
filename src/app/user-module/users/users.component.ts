import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { PATH } from "../../app.constants";
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Array<any> = []
  cols = [];
  username: string = "";
  activePage: number = 0;
  pager: any = {};
  page: number = 1;
  size: number = 5;
  pages: number[] = [];
  headers:Array<any>=[ {
    name: 'First Name',
    APIname: 'firstName',
    isAsc: true,
  },{
    name: 'Last Name',
    APIname: 'lastName',
    isAsc: true,
  },{
    name: 'Email',
    APIname: 'email',
    isAsc: true,
  },{
    name: 'Branch',
    APIname: 'branch',
    isAsc: true,
  },{
    name: 'Cadre',
    APIname: 'cadre',
    isAsc: true,
  },{
    name: 'Phone Number',
    APIname: 'phoneNumber',
    isAsc: true,
  },{
    name: 'User Name',
    APIname: 'userName',
    isAsc: true,
  },]
  type:string ="userName";
  order:string ="asc";
  constructor(private httpService: HttpService, private router: Router,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this.httpService.getData(`${PATH.USER}?offset=1&page=${this.activePage}&size=${this.size}&paged=true&sort=${this.type},${this.order}`).subscribe(res => {
      this.users = res.content;
      this.pager.totalPages = res.totalPages;
      this.pages = Array(res.totalPages);
    })
  }
  
  sortBy(type, details) {
    debugger
    this.type=type
    this.order = details.isAsc ? 'asc' : 'desc';
    this.getAllUsers()
  }
  edit(username) {
    this.router.navigate(['users', 'edit', username]);
  }
  getUser() {
    if (this.username!="") {
      this.httpService.getData(PATH.GET_USER_BY_NAME + this.username).subscribe(res => {
        // console.log(res)
        this.router.navigate(['users', 'edit', this.username]);
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Username Can't be empty" })
    }
  }
  delete(username){
    this.httpService.deleteData(PATH.GET_USER_BY_NAME + username).subscribe(res=>{
      this.getAllUsers()
    })
  }
  setPage(page: number) {
    this.activePage = page;
    this.getAllUsers()
  }
}
