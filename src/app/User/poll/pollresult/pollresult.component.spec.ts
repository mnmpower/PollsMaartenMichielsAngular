import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollresultComponent } from './pollresult.component';

describe('PollresultComponent', () => {
  let component: PollresultComponent;
  let fixture: ComponentFixture<PollresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
