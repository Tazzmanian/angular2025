import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  content = ''; // Default content
  
  contentChange(content: 'recipe' | 'shopping') {
    // Logic to handle page change can be added here
    this.content = content;
    console.log(`Content changed to: ${this.content}`);    
  }
}
