import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Route, Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthActions } from '../../../../store/actions';
import { AppearanceSettingComponent } from '../appearance-setting/appearance-setting.component';
import { GeneralSettingsComponent } from '../general-settings/general-settings.component';
import { PreferencesNavListComponent } from './preferences-nav-list.component';

const routes: Route[] = [
  { path: '', component: PreferencesNavListComponent },
  { path: 'appearance', component: AppearanceSettingComponent },
  { path: 'general', component: GeneralSettingsComponent },
];

@Component({
  selector: 'router-outlet',
  template: '',
})
class RouterOutletStubComponent {}

describe('PreferencesNavListComponent', () => {
  let component: PreferencesNavListComponent;
  let fixture: ComponentFixture<PreferencesNavListComponent>;
  let harness: RouterTestingHarness;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferencesNavListComponent, RouterOutletStubComponent],
      imports: [MatListModule, MatIconModule, MatDividerModule],
      providers: [provideMockStore(), provideRouter(routes)],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', PreferencesNavListComponent);

    fixture = TestBed.createComponent(PreferencesNavListComponent);
    store = TestBed.inject(MockStore);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleSignOut', () => {
    it('should dispatch the "logout" action', () => {
      spyOn(store, 'dispatch');
      component.handleSignOut();
      expect(store.dispatch).toHaveBeenCalledOnceWith(AuthActions.logout());
    });
  });

  describe('#routing', () => {
    // TODO: Fix this test
    // it('should navigate to the AppearanceComponent', async () => {
    //   const link: HTMLAnchorElement = (
    //     fixture.nativeElement as HTMLElement
    //   ).querySelector('[data-test="appearanceLink"]')!;

    //   link.click();
    //   harness.detectChanges();
    //   await fixture.whenStable();

    //   expect(TestBed.inject(Router).url).toEqual('/appearance');
    // });

    // it('should navigate to the GeneralSettingsComponent', async () => {
    //   const link: HTMLAnchorElement = (
    //     fixture.nativeElement as HTMLElement
    //   ).querySelector('[data-test="generalLink"]')!;

    //   link.click();
    //   harness.detectChanges();
    //   await fixture.whenStable();

    //   expect(TestBed.inject(Router).url).toEqual('/general');
    // });

    it('should navigate to the PreferencesComponent after logout', async () => {
      spyOn(store, 'dispatch');

      const link: HTMLAnchorElement = (
        fixture.nativeElement as HTMLElement
      ).querySelector('[data-test="signOutLink"]')!;

      link.click();
      harness.detectChanges();
      await fixture.whenStable();

      expect(TestBed.inject(Router).url).toEqual('/');
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    });
  });
});
