import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-register-user',
  templateUrl: `
    <div class= "view overlay zoom">
      <p class="white-text">Verificando solicitação de registro de usuario</p>
    </div>
    `
})
export class RegisterConfirmationComponent implements OnInit {
  public token: string;

  constructor(private apiService: ApiService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.apiService.confirmationRegisterToken(this.token).subscribe(register => {
      console.log('Confirmação de registro OK');
      this.router.navigate(['login']);
    }, error => {
      console.log('Erro na confirmação do registro ', error);
      this.router.navigate(['resend-register-token']);
    });
  }


  goBack() {
     this.location.back();
  }


}
