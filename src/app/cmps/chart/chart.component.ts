import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BitcoinService } from '../../services/bitcoin.service';

import 'chartjs-adapter-date-fns';
type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'scatter'
  | 'bubble'
  | 'polarArea';
Chart.register(...registerables);

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  chartTypeChangeSubject = new Subject<string>();
  marketPriceChartData: any[] = [];
  marketPriceData: any;
  confirmedTransactionsChartData: any[] = [];
  confirmedTransactionsData: any;
  chart: any;
  chartType: ChartType = 'bar';
  private changeDetector: ChangeDetectorRef;

  constructor(
    private bitcoinService: BitcoinService,
    changeDetector: ChangeDetectorRef
  ) {
    this.changeDetector = changeDetector;
  }

  async ngOnInit() {
    try {
      const [marketPriceData, confirmedTransactionsData] = await Promise.all([
        this.bitcoinService.getMarketPrice(),
        this.bitcoinService.getConfirmedTransactions(),
      ]);

      if (!marketPriceData || !confirmedTransactionsData) {
        console.log('Data not available for generating the chart');
        return;
      }

      this.marketPriceData = marketPriceData;
      this.confirmedTransactionsData = confirmedTransactionsData;

      this.marketPriceChartData = this.marketPriceData.values.map(
        ({ x, y }: { x: number; y: number }) => [x, y]
      );
      this.confirmedTransactionsChartData =
        this.confirmedTransactionsData.values.map(
          ({ x, y }: { x: number; y: number }) => [x, y]
        );

      this.generateChart();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  changeChartType(value: string) {
    if (value !== this.chartType) {
      this.chartType = value as ChartType;
      this.chart.config.type = this.chartType;
      this.chart.update();
      this.changeDetector.detectChanges();
    }
  }
  private generateChart() {
    if (!this.marketPriceData || !this.confirmedTransactionsData) {
      console.error('Data not available for generating the chart');
      return;
    }
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const chartConfig = {
      type: this.chartType,
      data: {
        labels: this.marketPriceChartData.map((data) => data[0]),
        datasets: [
          {
            label: this.marketPriceData.name,
            data: this.marketPriceChartData.map((data) => data[1]),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: this.confirmedTransactionsData.name,
            data: this.confirmedTransactionsChartData.map((data) => data[1]),
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'timeseries',
            ticks: {
              callback: function (value: any) {
                return value;
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value: any) {
                return value;
              },
            },
          },
        },
      },
    };

    if (this.chart) {
      this.chart.config.data = chartConfig.data;
      this.chart.config.options = chartConfig.options;
      this.chart.update();
    } else {
      this.chart = new Chart(ctx, chartConfig as ChartConfiguration);
    }
  }
}
