import { CanDeactivate } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>; // | Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | boolean {
    // run the function for canDeactivate and if its a promise or a boolean we handle it either way

    // if (component.canDeactivate) {
    //   let deactivate = component.canDeactivate();
    //   return this.toObservable(deactivate);
    // } else {
    //   return true;
    // }

    if (component.canDeactivate) {
      console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - allowed`);
      return this.toObservable(component.canDeactivate());
    } else {
      console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - not allowed`);
      return true;
    }
  }

  private toObservable(
    deactivate: Promise<boolean> | boolean
  ): Observable<boolean> | boolean {
    const p = Promise.resolve(deactivate);
    const o$ = from(p);
    return o$;
  }
}
