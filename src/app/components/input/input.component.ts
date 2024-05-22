import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() control?: string;
  @Input() nameInput?: string;
  @Input() typeInput?: string;
  @Input() required?: boolean;
}
