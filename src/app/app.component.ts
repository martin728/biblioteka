import { Component } from '@angular/core';
import { NgIf } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterOutlet } from '@angular/router';
import {BookConstructorComponent} from "./book-constructor/book-constructor.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookViewComponent } from "./book-view/book-view.component";
import {BookService} from "./service/book.service";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { Book } from "./models/models";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    BookListComponent,
    ToolBarComponent,
    BookViewComponent,
    NgIf,
    MatButtonModule,
    MatIconModule,
    BookConstructorComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lib';
  showBookConstructor = false;
  showBookView = false;
  newBook: Book = {
    imgLink: '',
    bookTitle: '',
    year: null,
    id: null,
    description:'',
    author:''
  };

  ngOnInit() {
    this.bookService.getBooks()
  }

  toggleConstructor() {
    this.showBookConstructor = !this.showBookConstructor;
  }

  onSelectBook() {
    this.showBookView = true;
    this.showBookConstructor = false;
  }

  constructor(private bookService: BookService) {}
}
