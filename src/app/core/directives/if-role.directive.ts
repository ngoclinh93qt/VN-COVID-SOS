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
    this.ifShow();
  }

  ifShow(){
    let role: string = this.storage.userInfo?.role?.toUpperCase() || 'GUEST';
    if (this.getRoleLevel(this.ifRoles) == 0 ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.getRoleLevel(this.ifRoles) >= 1 && this.getRoleLevel(role) >=1 ){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.getRoleLevel(this.ifRoles) >= 2 && this.getRoleLevel(role) >=2 ){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.getRoleLevel(this.ifRoles) >= 3 && this.getRoleLevel(role) >=3 ){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }


///higher-level roles can see elements of lower-level roles
  getRoleLevel(role: string): number {
    try {
      return Role[role as keyof typeof Role]
    } catch (error) {
      console.error(`Type ${role} not available`)
      return -1;
    }
  }

  public ngOnDestroy(): void {
  }
}

enum Role {
  GUEST, USER , OPERATOR, ADMIN
}