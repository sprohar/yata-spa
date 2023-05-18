import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatRadioGroupHarness } from '@angular/material/radio/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from '../../../../auth/models/user.model';
import { TaskView } from '../../../../interfaces';
import { selectUserPreferences } from '../../../../store/selectors';

import { TaskViewSettingComponent } from './task-view-setting.component';

const user: User = {
  id: '1',
  email: 'testuser@example.com',
  preferences: {
    taskView: TaskView.MINIMALIST,
  },
};

describe('TaskViewSettingComponent', () => {
  let component: TaskViewSettingComponent;
  let fixture: ComponentFixture<TaskViewSettingComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  const getRadioButtons = async () => {
    const groups = await loader.getAllHarnesses(MatRadioGroupHarness);
    const harness = groups.at(0);
    return await harness?.getRadioButtons();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MatRadioModule, ReactiveFormsModule, TaskViewSettingComponent],
    providers: [
        provideMockStore({
            selectors: [
                {
                    selector: selectUserPreferences,
                    value: user.preferences,
                },
            ],
        }),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(TaskViewSettingComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the MatRadioGroupHarness', async () => {
    const groups = await loader.getAllHarnesses(MatRadioGroupHarness);
    const harness = groups.at(0);
    const radioButtons = await harness?.getRadioButtons();

    expect(groups.length).toEqual(1);
    expect(radioButtons?.length).toEqual(2);
  });

  it('should check the radio button based on user preference (MINIMALIST)', async () => {
    store.overrideSelector(selectUserPreferences, {
      taskView: TaskView.MINIMALIST,
    });
    store.refreshState();
    fixture.detectChanges();

    const radioButtons = await getRadioButtons();
    const minimalistRB = radioButtons!.at(0);
    const informativeRB = radioButtons!.at(1);

    expect(await minimalistRB?.isChecked()).toBeTrue();
    expect(await informativeRB?.isChecked()).toBeFalse();
  });

  it('should check the radio button based on user preference (INFORMATIVE)', async () => {
    store.overrideSelector(selectUserPreferences, {
      taskView: TaskView.INFORMATIVE,
    });
    store.refreshState();
    fixture.detectChanges();

    const radioButtons = await getRadioButtons();
    const minimalistRB = radioButtons!.at(0);
    const informativeRB = radioButtons!.at(1);

    expect(await minimalistRB?.isChecked()).toBeFalse();
    expect(await informativeRB?.isChecked()).toBeTrue();
  });

  describe('#handleChange', () => {
    it('should dispatch an event to update user preference', () => {
      spyOn(store, 'dispatch');
      component.handleChange(TaskView.INFORMATIVE);
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch an event to update user preference when the slide-toggle is clicked (INFORMATIVE))', async () => {
      spyOn(component, 'handleChange');

      const radioButtons = await getRadioButtons();
      const informative = radioButtons!.at(1);
      await informative?.check();

      expect(component.handleChange).toHaveBeenCalledWith(TaskView.INFORMATIVE);
    });

    it('should dispatch an event to update user preference when the slide-toggle is clicked (MINIMALIST))', async () => {
      spyOn(component, 'handleChange');

      store.overrideSelector(selectUserPreferences, {
        taskView: TaskView.INFORMATIVE,
      });
      store.refreshState();
      fixture.detectChanges();

      const radioButtons = await getRadioButtons();
      const minimalistRB = radioButtons!.at(0);
      await minimalistRB?.check();

      expect(component.handleChange).toHaveBeenCalledWith(TaskView.MINIMALIST);
    });
  });
});
