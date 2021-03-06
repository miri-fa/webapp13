import { LoginService } from './../../services/login.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings-edit-account',
  templateUrl: './settings-edit-account.component.html',
  styleUrls: ['./settings-edit-account.component.css']
})
export class SettingsEditAccountComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService, public loginService:LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.refreshUser();
  }

  getUser(userId: string, page:number){
    this.userService.getUser(userId).subscribe(
      item => this.user = new User(item),
      error => this.router.navigate(['/error', error.status, error.statusText, error.name, error.message])
    )
  }

  update(photo,id:string,name:string,surname:string,email:string,phoneNumber:string,city:string,degree:string,freelance:string,category:string,description:string){
    this.userService.putUser(id,name,surname,email,phoneNumber,city,degree,freelance,category,description).subscribe(
      user => {
        if (photo.value != ""){
          this.userService.putImage(this.user.getId(), photo.files[0]).subscribe(
            ok => {
                this.user = this.loginService.refreshUser();
            },
            error => this.router.navigate(['/error', error.status, error.statusText, error.name, error.message])
          )
        }

      },
      error => this.router.navigate(['/error', error.status, error.statusText, error.name, error.message])
    )
  }

}
