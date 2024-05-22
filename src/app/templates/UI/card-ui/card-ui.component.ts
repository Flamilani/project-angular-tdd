import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-ui',
  templateUrl: './card-ui.component.html',
  styleUrl: './card-ui.component.css'
})
export class CardUiComponent {
  @Input() cardStyle?: any;
}
