import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss'],
})
export class RevenueChartComponent implements OnChanges {
  @Input() incomes: any;
  @Input() expenses: any;
  chartReady: boolean | undefined;
  options: any;

  constructor() {
    this.chartReady = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['incomes']) {
      if (this.incomes.length > 0) this.updateChart();
    }
  }

  public updateChart() {
    let inc = this.incomes;
    let exp = this.expenses;
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    let date: Date = new Date();
    for (let i = 1; i <= inc.length; i++) {
      let tempDate = new Date(
        date.getTime() - (inc.length - (i - 1)) * 86400000
      );
      xAxisData.push(
        tempDate.getDate().toString() +
          '.' +
          (tempDate.getMonth() + 1).toString()
      );
      data1.push(inc[i - 1]);
      data2.push(exp[i - 1]);
    }

    this.options = {
      legend: {
        data: ['income', 'expense'],
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
          name: 'income',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'expense',
          type: 'bar',
          data: data2,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
    this.chartReady = true;
  }
}
