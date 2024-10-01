import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {DEFAULT_BOOK_LIST} from "../models/constants";
import { Book } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksSubject: BehaviorSubject<Book[]>;

  constructor() {
    const storedBooks = this.loadBooksFromLocalStorage();
    this.booksSubject = new BehaviorSubject<Book[]>(storedBooks);
  }

  getBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  addBook(book: Book) {
    const currentBooks = this.booksSubject.value;
    const updatedBooks = [...currentBooks, {...book, id:currentBooks.length + 1}];
    this.booksSubject.next(updatedBooks);
    this.saveBooksToLocalStorage(updatedBooks);
  }

  updateBook(updatedBook: Book) {
    const currentBooks = this.booksSubject.value;
    const index = currentBooks.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      currentBooks[index] = updatedBook;
      this.booksSubject.next(currentBooks);
      this.saveBooksToLocalStorage(currentBooks);
    }
  }

  deleteBook(id: number) {
    const currentBooks = this.booksSubject.value;
    const updatedBooks = currentBooks.filter(book => book.id !== id);
    this.booksSubject.next(updatedBooks);
    this.saveBooksToLocalStorage(updatedBooks);
  }

  private loadBooksFromLocalStorage(): Book[] {
    const booksJSON = localStorage.getItem('books');
    return booksJSON ? JSON.parse(booksJSON) : this.loadInitialBooks();
  }

  private saveBooksToLocalStorage(books: Book[]): void {
    localStorage.setItem('books', JSON.stringify(books));
  }

  private loadInitialBooks(): Book[] {
    return DEFAULT_BOOK_LIST
  }
}
