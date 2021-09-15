import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenService } from '../http/authen.service';
import { UsersService } from '../http/users.service';
import { StorageService } from '../services/storage.service';

@Directive({
  selector: '[ifRoles]'
})
export class IfRoleDirective implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  // the role the user must have
  @Input() public ifRoles: string[] = ['GUEST'];

  /**
   * @param {ViewContainerRef} viewContainerRef -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private storage: StorageService,
    private userService: UsersService
  ) { }

  public ngOnInit(): void {
    this.ifShow();
    this.userService.userSubject.subscribe(result => this.ifShow(result))
  }

  ifShow(user?: IUser){
    let role: Role = (user? user:this.storage.userInfo)?.role?.toUpperCase() || 'GUEST';

    this.viewContainerRef.clear();
    if(this.ifRoles.includes(role.toString())){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  public ngOnDestroy(): void {
  }
}

enum Role {
  GUEST, USER , OPERATOR, ADMIN
}