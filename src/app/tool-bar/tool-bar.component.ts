import { AsyncPipe } from "@angular/common";
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  templateUrl: './tool-bar.component.html',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    AsyncPipe
  ],
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {
  constructor(private bookService: BookService) {}
}
