import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'yata-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  readonly isHandset$ = this.breakpointService.isHandset$;

  constructor(private readonly breakpointService: BreakpointService) {}
}
