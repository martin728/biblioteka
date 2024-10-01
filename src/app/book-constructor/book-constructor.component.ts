import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Book } from "../models/models";
import { BookService } from "../service/book.service"; // Import the service

@Component({
  selector: 'app-book-constructor',
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
  templateUrl: './book-constructor.component.html',
  styleUrls: ['./book-constructor.component.scss'],
})
export class BookConstructorComponent {
  bookForm: FormGroup;
  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      bookTitle: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      imgLink: ['https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg', Validators.required]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.addBook(newBook);
      this.bookForm.reset();
    }
  }
}
