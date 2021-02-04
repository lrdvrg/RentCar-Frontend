import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public emitter = new Subject<boolean>();

  start() {
    this.emitter.next(true);
  }

  end() {
    this.emitter.next(false);
  }
}
