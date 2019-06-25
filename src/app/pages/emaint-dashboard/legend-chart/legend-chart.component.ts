import { Component, OnInit, Input } from '@angular/core';

import { NgxLegendItemColor } from './enum.legend-item-color';

@Component({
  selector: 'mes-legend-chart',
  templateUrl: './legend-chart.component.html',
  styleUrls: ['./legend-chart.component.scss']
})
export class LegendChartComponent implements OnInit {
  /**
   * Take an array of legend items
   * Available iconColor: 'green', 'purple', 'light-purple', 'blue', 'yellow'
   * @type {{iconColor: string; title: string}[]}
   */
  @Input()
  legendItems: { iconColor: NgxLegendItemColor; title: string }[] = [];
  constructor() { }

  ngOnInit() {
  }

}
