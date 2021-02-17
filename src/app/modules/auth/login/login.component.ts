import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { AlertOptionsService } from '../../dashboard/managment/shared/services/alert-options.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = '';
  password = '';

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private ao: AlertOptionsService,
    private loader: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user, this.password);

    if (this.user === '' || this.password === '') {
      this.dialog.open(AlertDialogComponent, {
        disableClose: true,
        data: this.ao.loginWarningDialogWarningConfig
      });
    } else {
      this.loader.start();
      this.auth.getUser().subscribe(res => {
        console.log(res);
        const users = res;

        for (const user of users) {
          if (user.Username === this.user) {
            if (user.Password === this.password) {
              const body = {
                user: this.user,
                logged: true
              }
              localStorage.setItem('user', JSON.stringify(body));
              console.log(localStorage.getItem('user'));

              this.router.navigateByUrl('/dashboard');
            } else {
              this.dialog.open(AlertDialogComponent, {
                disableClose: true,
                data: this.ao.loginErrorDialogWarningConfig
              });
            }
          }
        }
      });
      this.loader.end();

    }
  }
}
