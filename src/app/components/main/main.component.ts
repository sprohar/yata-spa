import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { BreakpointService } from '../../services/breakpoint.service';
import { CreateTaskFabButtonComponent } from '../create-task-fab-button/create-task-fab-button.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'yata-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatSidenavModule,
    NavbarComponent,
    CreateTaskFabButtonComponent,
    SidenavComponent,
    MatToolbarModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    AsyncPipe,
  ],
})
export class MainComponent {
  readonly isHandset$ = this.breakpointService.isHandset$;

  constructor(private readonly breakpointService: BreakpointService) {}
}
