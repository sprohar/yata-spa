import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { provideRouter, Route, Router, RouterLink } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthActions } from '../../store/actions';
import { AppearanceSettingComponent } from './components/appearance-setting/appearance-setting.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';

import { PreferencesComponent } from './preferences.component';

const routes: Route[] = [
  { path: 'appearance', component: AppearanceSettingComponent },
  { path: 'general', component: GeneralSettingsComponent },
  { path: '', component: PreferencesComponent },
];

@Component({
  selector: 'router-outlet',
  template: '',
})
class RouterOutletStubComponent {}

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;
  let harness: RouterTestingHarness;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferencesComponent, RouterOutletStubComponent],
      imports: [MatListModule, MatIconModule, RouterLink],
      providers: [provideMockStore(), provideRouter(routes)],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/', PreferencesComponent);

    fixture = TestBed.createComponent(PreferencesComponent);
    store = TestBed.inject(MockStore);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the AppearanceComponent', async () => {
    const a: HTMLAnchorElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector('[data-test="appearanceLink"]')!;

    a.click();
    harness.detectChanges();
    await fixture.whenStable();

    expect(TestBed.inject(Router).url).toEqual('/appearance');
  });

  it('should navigate to the GeneralSettingsComponent', async () => {
    const a: HTMLAnchorElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector('[data-test="generalLink"]')!;

    a.click();
    harness.detectChanges();
    await fixture.whenStable();

    expect(TestBed.inject(Router).url).toEqual('/general');
  });

  it('should navigate to the GeneralSettingsComponent', async () => {
    spyOn(store, 'dispatch');

    const a: HTMLAnchorElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector('[data-test="signOutLink"]')!;

    a.click();
    harness.detectChanges();
    await fixture.whenStable();

    expect(TestBed.inject(Router).url).toEqual('/');
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
  });
});
