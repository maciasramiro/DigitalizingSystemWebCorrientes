import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  token: string = ''
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) {
  }
  ngOnInit(): void {

  }

  login() {
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    this.authService.signIn(this.username, this.password).subscribe(
      (response: any) => {
        if (response) {
          this.router.navigateByUrl('/dashboard/persona');
        } else {
          this.toastr.success('Credenciales Incorrectas', 'Advertencia', {
            disableTimeOut: true,
            tapToDismiss: false,
            positionClass: 'toast-top-right',
            toastClass: "toast-icon custom-toast-success"
          });

          return;
        }
      },
      (error) => {
        console.log(error);
      }
    );


  }
}
