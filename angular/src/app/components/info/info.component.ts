import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private userService:UserService, private loginService:LoginService, private router:Router) { }


  ngOnInit(): void {

  }

  goToActiveTemplate():void{
    this.userService.getUserActiveTemplate(this.loginService.currentUser().content.id).subscribe(
      template => {
        if (template.price==0){
          this.router.navigate(["/free-template", this.loginService.currentUser().getId()])
        }else{
          this.router.navigate(["/premium-template", this.loginService.currentUser().getId()])
        }
      },
      error => this.router.navigate(['/error', error.status, error.statusText, error.name, error.message])
    )
  }



}
