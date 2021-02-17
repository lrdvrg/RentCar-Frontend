import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AlertOptionsService } from '../../dashboard/managment/shared/services/alert-options.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = '';
  password = '';
  confirmPassword = '';

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

    if (this.user === '' || this.password === '' || this.confirmPassword === '') {
      this.dialog.open(AlertDialogComponent, {
        disableClose: true,
        data: this.ao.loginWarningDialogWarningConfig
      });
    } else if (this.password !== this.confirmPassword) {
      this.dialog.open(AlertDialogComponent, {
        disableClose: true,
        data: this.ao.passwordDialogWarningConfig
      });
    } else {
      this.loader.start();
      this.auth.getUser().subscribe(res => {
        const users = res;
        let userExists = false;
        for (const user of users) {
          if (user.Username === this.user) {
            userExists = true;
          }
        }

        if (!userExists) {
          this.auth.postUser({ Username: this.user, Password: this.password }).subscribe(res => {
            this.dialog.open(AlertDialogComponent, {
              disableClose: true,
              data: this.ao.userCreatedDialogWarningConfig
            });
            this.router.navigateByUrl('/auth/login');
          });
        } else {
          this.dialog.open(AlertDialogComponent, {
            disableClose: true,
            data: this.ao.userExistsDialogWarningConfig
          });
        }
      });
      this.loader.end();

    }
  }
}
