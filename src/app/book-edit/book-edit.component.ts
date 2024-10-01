import { CommonModule } from "@angular/common";
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BookViewComponent } from "../book-view/book-view.component";
import { Book } from "../models/models";

@Component({
  selector: 'app-book-edit',
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
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  @Input() book?: Book = this.data.bookInfo;
  bookForm!: FormGroup;
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: { bookInfo: Book },public dialogRef: MatDialogRef<BookViewComponent>) {
    this.bookForm = this.fb.group({
      bookTitle: [this.book?.bookTitle, Validators.required], // Updated to match template
      year: [this.book?.year, [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      imgLink: ['', Validators.required],
      description: ['', Validators.required],
      author: [this.book?.author, Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      bookTitle: [this.book?.bookTitle, [Validators.required]],
      year: [this.book?.year, [Validators.required]],
      description: [this.book?.description, [Validators.required]],
      imgLink: [this.book?.imgLink, Validators.required],
      author: [this.book?.author, Validators.required],
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const updatedBook = {...this.bookForm.value,id:this.book?.id};
      this.dialogRef.close(updatedBook);
    }
  }
}
