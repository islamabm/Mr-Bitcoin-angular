import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @ViewChild('chartCanvas', { static: false })
  chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartTypeChangeSubscription: Subscription;

  constructor(
    private bitcoinService: BitcoinService,
    changeDetector: ChangeDetectorRef
  ) {
    this.changeDetector = changeDetector;
    this.chartTypeChangeSubscription = this.chartTypeChangeSubject
      .pipe(debounceTime(300))
      .subscribe((chartType) => this.changeChartType(chartType));
  }

  ngOnDestroy() {
    this.chartTypeChangeSubscription.unsubscribe();
  }

  async ngOnInit() {
    try {
      const marketPriceData = await this.bitcoinService.getMarketPrice();
      const confirmedTransactionsData =
        await this.bitcoinService.getConfirmedTransactions();

      console.log('this.marketPriceData', marketPriceData);
      console.log(
        'this.confirmedTransactionsData',
        this.confirmedTransactionsData
      );

      if (!marketPriceData || !confirmedTransactionsData) {
        console.log('Data not available for generating the chart');
        return;
      }

      this.marketPriceData = marketPriceData.values;
      this.confirmedTransactionsData = confirmedTransactionsData.values;
      console.log('this.marketPriceData', this.marketPriceData);
      console.log(
        'this.confirmedTransactionsData',
        this.confirmedTransactionsData
      );

      this.marketPriceChartData = this.marketPriceData.map(
        ({ x, y }: { x: number; y: number }) => [x, y]
      );
      this.confirmedTransactionsChartData = this.confirmedTransactionsData.map(
        ({ x, y }: { x: number; y: number }) => [x, y]
      );

      console.log('marketPriceChartData', this.marketPriceChartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  ngAfterViewInit() {
    requestAnimationFrame(() => this.generateChart());
  }

  changeChartType(value: string) {
    if (value !== this.chartType) {
      this.chartType = value as ChartType;
      this.chart.config.type = this.chartType;
      this.chart.update();
      this.changeDetector.detectChanges();
    }
  }
  private generateChart = () => {
    console.log('this.marketPriceData', this.marketPriceData);
    console.log(
      'this.confirmedTransactionsData',
      this.confirmedTransactionsData
    );

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    console.log('marketPriceData', this.marketPriceChartData);

    console.log('ctx', ctx);
    const chartConfig = {
      type: this.chartType,
      data: {
        labels: ['red', 'green'],
        datasets: [
          {
            label: 'market prices',
            data: this.marketPriceChartData.map((data) => data[1]),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'confirmed trancs',
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
  };
}
