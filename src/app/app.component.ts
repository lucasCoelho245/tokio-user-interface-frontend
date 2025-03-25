import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public users: any[] = [];

  public addUser(user: any): void {
    this.users.push(user);
  }
}
