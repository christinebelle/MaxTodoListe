import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolisteComponent } from './todoliste.component';

describe('TodolisteComponent', () => {
  let component: TodolisteComponent;
  let fixture: ComponentFixture<TodolisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
