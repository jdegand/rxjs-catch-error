import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
    <div class="form-container">
      <span>Possible values: posts, comments, albums, photos, todos, users</span>
    </div>
    <div class="form-container">
      <form (ngSubmit)="onSubmit()">
        <input type="text" placeholder="Enter text" [formControl]="search" />
        <button type="submit">Fetch</button>
      </form>
      <div class="response">
        {{ response | json }}
      </div>
    </div>
  `,
  styles: [
    `
      body {
        font-family: Arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
      }
      .form-container {
        text-align: center;
      }
      .response {
        margin-left: 25%;
        margin-top: 2%;
        width: 50%;
        text-align: center;
        border: 1px solid #ccc;
      }
      input {
        padding: 8px;
        margin-right: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        padding: 8px 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class AppComponent {

  search = new FormControl('');

  response: unknown;
  constructor(private http: HttpClient) { }

  onSubmit() {
    return this.http.get(`https://jsonplaceholder.typicode.com/${this.search.value}/1`).subscribe((data) => {
      this.response = data;
    })
  }
}
