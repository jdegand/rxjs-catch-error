import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, fromEvent, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div class="form-container">
      <span>Possible values: posts, comments, albums, photos, todos, users</span>
    </div>
    <div class="form-container">
      <input #inputRef type="text" placeholder="Enter text" />
      <button #buttonRef>Fetch</button>
    </div>
    <div class="form-container">
      {{ response | json }}
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
  @ViewChild('buttonRef', { static: true }) buttonRef!: ElementRef;
  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef;
  response: unknown;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const buttonClick$ = fromEvent(this.buttonRef.nativeElement, 'click');
    buttonClick$
      .pipe(
        map(() => this.inputRef.nativeElement.value),
        concatMap((value) =>
          this.http.get(`https://jsonplaceholder.typicode.com/${value}/1`)
        ),
        catchError((err, caught) => caught), // all you have to add
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.response = value;
        },
        error: (error) => {
          console.log(error);
          this.response = error;
        },
        complete: () => console.log('done'),
      });
  }
}
