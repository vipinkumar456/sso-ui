import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.gaurd';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
    {

        path: '',
        redirectTo: 'all',
    },
    {
        path: "all",
        component: UsersComponent,
        data: {
            title: "User Management",
            roles: ['ROLE_ADMIN']
        },
        canLoad: [AuthGuard]
    }, {
        path: "edit/:username",
        component: UserEditComponent,
        data: {
            title: "Edit User",
            roles: ['ROLE_ADMIN']
        },
        canLoad: [AuthGuard]
    }, {
        path: "profile",
        component: UserEditComponent,
        data: {
            title: "User Profile",
            roles: []
        },
        canLoad: [AuthGuard]
    },
    // {
    //     path: "add",
    //     component: UserEditComponent,
    //     data: {
    //         title: "Add User",
    //         roles: ['ROLE_ADMIN']
    //     },
    //     canLoad: [AuthGuard]
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
