import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

interface UserResponse {
  login: string,
  bio: string,
  company: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<UserResponse>('https://api.github.com/users/maxburda')
      .subscribe(data => {
        console.log(data.login);
        console.log(data.bio);
        console.log(data.company);
      },
        (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side Error occurred");
        } else {
          console.log("Server-side Error occurred");
        }

      }
    );
    const req =this.http.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userUd: 1
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occurred");
        }
      )
  }
}
