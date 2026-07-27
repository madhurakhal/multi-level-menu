import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagementDocument } from './file-management-document';

describe('FileManagementDocument', () => {
  let component: FileManagementDocument;
  let fixture: ComponentFixture<FileManagementDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileManagementDocument],
    }).compileComponents();

    fixture = TestBed.createComponent(FileManagementDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
