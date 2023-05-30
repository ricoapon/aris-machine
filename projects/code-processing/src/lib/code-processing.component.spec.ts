import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeProcessingComponent } from './code-processing.component';

describe('CodeProcessingComponent', () => {
  let component: CodeProcessingComponent;
  let fixture: ComponentFixture<CodeProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
