import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerKanbanComponent } from './creer-kanban.component';

describe('CreerKanbanComponent', () => {
  let component: CreerKanbanComponent;
  let fixture: ComponentFixture<CreerKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
