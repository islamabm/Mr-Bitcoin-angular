import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss'],
})
export class MovesListComponent implements OnInit {
  @Input() moves!: any[];

  constructor() {}

  ngOnInit(): void {}
}
