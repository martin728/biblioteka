import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BookEditComponent } from "../book-edit/book-edit.component";
import { Book } from "../models/models";
import { BookService } from "../service/book.service";

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css'],
})
export class BookViewComponent {
  @Input() bookInfo: Book;
  @Output() bookInfoChange = new EventEmitter<Book>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private dialog: MatDialog,
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookViewComponent>
  ) {
    this.bookInfo = data.book;
  }

  onEdit() {
    const dialogRef = this.dialog.open(BookEditComponent, {
      data: { bookInfo: this.bookInfo }
    });

    dialogRef.afterClosed().subscribe((updatedBook: Book) => {
      if (updatedBook) {
        this.bookInfo = updatedBook;
        this.bookService.updateBook(updatedBook);
        this.bookInfoChange.emit(this.bookInfo);
      }
    });
  }

  onDelete(id:number) {
    this.bookService.deleteBook(id);
    this.dialogRef.close();
  }
}
