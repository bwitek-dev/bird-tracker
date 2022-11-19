import { Component, OnInit, Input } from '@angular/core';
import { BirdLocation } from 'src/app/data/BirdLocation';

@Component({
  selector: 'app-bird-popup',
  templateUrl: './bird-popup.component.html',
  styleUrls: ['./bird-popup.component.scss']
})
export class BirdPopupComponent implements OnInit {
  @Input() birdSpot!: BirdLocation;
  constructor() { }

  ngOnInit(): void {
  }

}
