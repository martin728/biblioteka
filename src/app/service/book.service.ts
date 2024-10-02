import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { DEFAULT_BOOK_LIST } from '../models/constants';
import { Book } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>(this.loadInitialBooks());
  private searchTerms = new BehaviorSubject<string>('');

  constructor() {
    this.loadBooksFromStorage();
  }

  getBooks(): Observable<Book[]> {
    return combineLatest([
      this.booksSubject.asObservable(),
      this.searchTerms.asObservable(),
    ]).pipe(
      map(([books, searchTerm]) =>
        books.filter(book =>
          book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  setSearchTerm(term: string): void {
    this.searchTerms.next(term);
  }

  getFilteredBooks(): Observable<Book[]> {
    return this.getBooks();
  }

  addBook(book: Book): void {
    const updatedBooks = [
      ...this.booksSubject.value,
      { ...book, id: this.booksSubject.value.length + 1 },
    ];
    this.updateBooks(updatedBooks);
  }

  updateBook(updatedBook: Book): void {
    const updatedBooks = this.booksSubject.value.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    this.updateBooks(updatedBooks);
  }

  deleteBook(id: number): void {
    const updatedBooks = this.booksSubject.value.filter(book => book.id !== id);
    this.updateBooks(updatedBooks);
  }

  private updateBooks(books: Book[]): void {
    this.booksSubject.next(books);
    this.saveBooksToLocalStorage(books);
  }

  private saveBooksToLocalStorage(books: Book[]): void {
    localStorage.setItem('books', JSON.stringify(books));
  }

  private loadBooksFromStorage(): void {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.booksSubject.next(JSON.parse(storedBooks));
    }
  }

  private loadInitialBooks(): Book[] {
    return DEFAULT_BOOK_LIST;
  }
}
