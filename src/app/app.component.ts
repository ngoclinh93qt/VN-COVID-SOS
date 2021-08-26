import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VNSOS';
  color = {
    accent: 'accent',
    primary: 'primary',
    warn: 'warn',
  };
  icon = {
    home: 'home',
    menu: 'menu',
    favorite: 'favorite',
  };
  text = 'Home';
  print(s: string) {
    console.log(s);
  }
}
