import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { BookViewComponent } from "../book-view/book-view.component";
import { Book } from "../models/models";
import { BookService } from "../service/book.service";
import { BookComponent } from "./book/book.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, MatListModule, BookComponent, MatCard],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnChanges{
  constructor(private bookService: BookService,private _dialog: MatDialog) {}

  @Output() selectedBook = new EventEmitter<Book>();
  @Input() newBook:Book | null = null;

  bookList: Book[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(this.newBook?.bookTitle) {
      this.bookList.push(this.newBook)
    }
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.bookList = books;
    });
  }

  onDelete(id: number) {
    this.bookService.deleteBook(id);
  }

  onClick(id: number) {
    const selectedBook = this.bookList[id];
    const dialogRef = this._dialog.open(BookViewComponent, {
      data: { book: selectedBook }
    });

    dialogRef.afterClosed().subscribe((updatedBook: Book) => {
      if (updatedBook) {
        this.bookList[id] = updatedBook;
      }
    });
  }
}
