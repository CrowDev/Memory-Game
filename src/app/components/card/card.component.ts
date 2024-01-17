import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Entry } from '../../@types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() entry!: Entry;
}
