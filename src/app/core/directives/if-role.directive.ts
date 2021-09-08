import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenService } from '../http/authen.service';
import { StorageService } from '../services/storage.service';

@Directive({
  selector: '[ifRoles]'
})
export class IfRoleDirective implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  // the role the user must have
  @Input() public ifRoles: string = 'GUEST';

  /**
   * @param {ViewContainerRef} viewContainerRef -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private storage: StorageService,
    private loginService: AuthenService
  ) { }

  public ngOnInit(): void {
    console.log(this.ifRoles)
    let role: Role = this.storage.userInfo?.role || 'GUEST';
    if (this.getNumberByRole(this.ifRoles) == 0 ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.getNumberByRole(this.ifRoles) >= 1 && this.getNumberByRole(role) >=1 ){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.getNumberByRole(this.ifRoles) >= 2 && this.getNumberByRole(role) >=2 ){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.getNumberByRole(this.ifRoles) >= 2 && this.getNumberByRole(role) >=3 ){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  getNumberByRole(role: string): number {
    switch (role) {
      case 'GUEST':
        return 0;
      case 'USER':
        return 1;
      case 'OPERATOR':
        return 2;
      case 'ADMIN':
        return 3;
      default:
        return 0;
    }
  }

  /**
   * on destroy cancels the API if its fetching.
   */
  public ngOnDestroy(): void {
    // this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}

type Role = 'GUEST' | 'USER' | 'OPERATOR' | 'ADMIN';