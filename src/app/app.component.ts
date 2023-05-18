import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();

  @HostBinding('class') classAttribute = '';

  constructor(private readonly theme: ThemeService) {}

  ngOnInit(): void {
    this.theme.isDarkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDarkTheme: boolean) => {
        this.classAttribute = isDarkTheme ? '' : 'light-theme';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
