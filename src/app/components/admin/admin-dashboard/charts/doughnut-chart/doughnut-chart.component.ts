import {Component, Input, OnInit} from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  @Input() data: number[] = [];
  doughnutChartLabels: string[] = [];
  doughnutChartData: ChartData<'doughnut'> = { labels : [], datasets : []};
  doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    this.initComps();
  }

  private initComps() {
    this.doughnutChartLabels = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
    this.doughnutChartData = {
      //labels: this.doughnutChartLabels,
      datasets: [
        { data: this.data },
        //{ data: [ 50, 150, 120 ] },
        //{ data: [ 250, 130, 70 ] }
      ]
    };
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
