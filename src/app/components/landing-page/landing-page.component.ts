import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'yata-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
