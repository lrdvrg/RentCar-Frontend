import { Component } from '@angular/core';
import { Router, RouterEvent, ChildActivationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RentCar';

  showOverlay = true;
  private listener: Subscription;

  constructor(
    private loader: LoaderService,
    private router: Router
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.listener = this.loader.emitter
      .subscribe(val => {
        /**
         * El setTimeout es para romper el ciclo y no tire el error de cambio imprevisto.
         */
        setTimeout(() => {
          this.showOverlay = val;
        });
      });
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener.unsubscribe();
    }
  }

  /**
   * Interceptar las navegaciones para insertar el loader.
   */
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof ChildActivationStart) {
      this.loader.start();
    }
    if (event instanceof NavigationEnd) {
      this.loader.end();
    }

    if (event instanceof NavigationCancel) {
      this.loader.end();
    }
    if (event instanceof NavigationError) {
      this.loader.end();
    }
  }
}
