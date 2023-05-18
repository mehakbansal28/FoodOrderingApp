import { Component } from '@angular/core';
import { ReportService } from '../shared/services/report.service';
import { Order } from '../shared/models/order.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  orderList: Order[] = [];
  public chart: any;
  public barChart: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getReport();
  }

  getReport(): void {
    this.reportService.getReport().subscribe(
      (orders: Order[]) => {
        this.orderList = orders;
        this.createChart();
        this.createBarChart();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  createChart() {
    const statusValues = this.orderList.map((order) => order.status);
    console.log(statusValues);
    const statusCount: Record<string, number> = {};
    for (let i = 0; i < statusValues.length; i++) {
      const status = statusValues[i];
      if (statusCount[status]) {
        statusCount[status] += 1;
      } else {
        statusCount[status] = 1;
      }
    }

    const labels = Object.keys(statusCount);
    const dataValues = Object.values(statusCount);

    this.chart = new Chart('MyChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: [
              '#4CAF50', // green for DELIVERED
              '#f0ad4e', // orange for PLACED
              '#F44336', // red for FAILED
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Orders By Status',
          },
        },
      },
    });
  }

  createBarChart() {
    const ordersByDate = this.groupOrdersByDate(this.orderList);
    const dates = Object.keys(ordersByDate);
    const ordersCount = Object.values(ordersByDate);

    this.barChart = new Chart('MyBarChart', {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Number of Orders',
            data: ordersCount,
            backgroundColor: '#36a2eb',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Orders Per Day',
          },
        },
      },
    });
  }

  groupOrdersByDate(orders: any[]) {
    const ordersByDate: Record<string, number> = {};

    orders.forEach((order) => {
      const date = order.creationDate;

      if (!ordersByDate[date]) {
        ordersByDate[date] = 0;
      }

      if (order.status === 'PLACED') {
        ordersByDate[date]++;
      }
    });

    return ordersByDate;
  }
}
