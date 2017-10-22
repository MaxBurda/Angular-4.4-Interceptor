import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

interface UserResponse {
  login: string,
  bio: string,
  subscriptions_url: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private _loadingBar: SlimLoadingBarService) {

  }

  ngOnInit(): void {
    this.http.get<UserResponse>('https://api.github.com/users/maxburda')
      .subscribe(data => {
          console.log(data.login);
          console.log(data.bio);
          console.log(data.subscriptions_url);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side Error occurred");
          } else {
            console.log("Server-side Error occurred");
          }
        }
      );
    const req = this.http.post('https://jsonplaceholder.typicode.com/posts', {
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
