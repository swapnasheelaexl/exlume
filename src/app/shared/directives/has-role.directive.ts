import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective {
  private tpl = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);
  private auth = inject(AuthService);

  @Input() set hasRole(roles: string[]) {
    this.vcr.clear();
    if (this.auth.hasRole(roles)) this.vcr.createEmbeddedView(this.tpl);
  }
}
