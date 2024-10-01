import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { DEFAULT_BOOK_LIST } from "../models/constants";
import { Book } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksSubject: BehaviorSubject<Book[]>;
  private searchTerms: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    const storedBooks = localStorage.getItem('books');
    const initialBooks: Book[] = storedBooks ? JSON.parse(storedBooks) : this.loadInitialBooks();
    this.booksSubject = new BehaviorSubject<Book[]>(initialBooks);
  }

  getBooks(): Observable<Book[]> {
    return combineLatest([
      this.booksSubject.asObservable(),
      this.searchTerms.asObservable(),
    ]).pipe(
      map(([books, searchTerm]) =>
        books.filter(book =>
          book.bookTitle.toLowerCase().includes(searchTerm)
        )
      )
    );
  }

  setSearchTerm(term: string): void {
    this.searchTerms.next(term.toLowerCase());
  }

  getFilteredBooks(): Observable<Book[]> {
    return this.getBooks();
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

  private saveBooksToLocalStorage(books: Book[]): void {
    localStorage.setItem('books', JSON.stringify(books));
  }

  private loadInitialBooks(): Book[] {
    return DEFAULT_BOOK_LIST
  }
}
