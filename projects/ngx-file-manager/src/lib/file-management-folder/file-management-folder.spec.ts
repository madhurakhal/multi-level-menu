import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagementFolder } from './file-management-folder';

describe('FileManagementFolder', () => {
  let component: FileManagementFolder;
  let fixture: ComponentFixture<FileManagementFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileManagementFolder],
    }).compileComponents();

    fixture = TestBed.createComponent(FileManagementFolder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
