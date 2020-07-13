import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public sideBarOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(_$event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
