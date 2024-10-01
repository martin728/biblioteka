import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookConstructorComponent } from './book-constructor.component';

describe('BookConstructorComponent', () => {
  let component: BookConstructorComponent;
  let fixture: ComponentFixture<BookConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookConstructorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
