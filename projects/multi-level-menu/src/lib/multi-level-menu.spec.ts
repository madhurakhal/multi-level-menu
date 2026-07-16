import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLevelMenu } from './multi-level-menu';

describe('MultiLevelMenu', () => {
  let component: MultiLevelMenu;
  let fixture: ComponentFixture<MultiLevelMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLevelMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiLevelMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
