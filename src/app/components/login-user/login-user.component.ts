import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/core/model/login';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  user = new UserLogin();

  constructor(private apiService: ApiService,
              private route: Router) { 

  }

  ngOnInit() {
  }

  public login() {
    console.log('AQUI AQUI');
    console.log(this.user);
    this.apiService.login(this.user).subscribe(data => {

      this.loginSucess(data);
    }, error => {
      console.log('ERRO AO FAZER LOGIN ==== ' + error);
    })
  }

  public loginSucess(data: any) {

    localStorage.clear();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);

    this.apiService.getMainUser(localStorage.getItem('accessToken')).subscribe(user => {
      this.redirectPage(user);
    }, error => {
      console.log('ERROR AO PEGAR USUARIO LOGADO' + error);
    });

  }

  public redirectPage(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));

    this.route.navigate(['welcome']);
  }


}
