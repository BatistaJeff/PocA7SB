import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { UserDTO } from 'src/app/core/model/userDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resend-registration-token',
  templateUrl: './resend-registration-token.component.html',
  styleUrls: ['./resend-registration-token.component.scss']
})
export class ResendRegistrationTokenComponent implements OnInit {

  public user = new UserDTO();

  constructor(private apiService: ApiService,
              private router: Router) { }

  ngOnInit() {
  }

  resendToken() {
    this.apiService.resendRegisterToken(this.user).subscribe(data => {
      console.log('redirecionando a tela de Login');
      this.router.navigate(['login']);
    }, error => {
      console.log('Erro ao redirecionando a tela de Login', error);
    });
  }
}
