import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-orders-count-chart',
  templateUrl: './orders-count-chart.component.html',
  styleUrls: ['./orders-count-chart.component.scss'],
})
export class OrdersCountChartComponent implements OnChanges {
  @Input() ordersCount: any;
  chartReady: boolean | undefined;
  options: any;

  constructor() {
    this.chartReady = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ordersCount']) {
      if (this.ordersCount.length > 0) this.updateChart();
    }
  }

  public updateChart() {
    let count = this.ordersCount;
    const xAxisData = [];
    const data1 = [];

    let date: Date = new Date();
    for (let i = 1; i <= count.length; i++) {
      let tempDate = new Date(
        date.getTime() - (count.length - (i - 1)) * 86400000
      );
      xAxisData.push(
        tempDate.getDate().toString() +
          '.' +
          (tempDate.getMonth() + 1).toString()
      );
      data1.push(count[i - 1]);
    }

    this.options = {
      legend: {
        data: ['OrdersCount'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'OrdersCount',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
    this.chartReady = true;
  }
}
