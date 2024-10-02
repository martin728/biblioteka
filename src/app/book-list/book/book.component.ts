import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Book } from "../../models/models";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, MatListModule,
    MatDividerModule,
    MatIconModule, MatIconButton],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Output() delete = new EventEmitter<number>();
  @Output() openPopup = new EventEmitter<number>();
  @Input() id!: number;
  @Input() book: Book | null = null

  onItemClick(){
    this.openPopup.emit(this.id);
  }
}
