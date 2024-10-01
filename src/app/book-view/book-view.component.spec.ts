import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookViewComponent } from './book-view.component';

describe('BookListComponent', () => {
  let component: BookViewComponent;
  let fixture: ComponentFixture<BookViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookViewComponent]
    });
    fixture = TestBed.createComponent(BookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
