import * as Highcharts from 'highcharts';

import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { CardModule } from 'primeng/card';
import { ColDef } from 'ag-grid-community';

// import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [AgGridAngular, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ temporary fallback
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Highcharts: typeof Highcharts = Highcharts;

  // chartOptions: Highcharts.Options = {
  //   chart: { backgroundColor: '#1b1b1b' },
  //   title: { text: 'Monthly Metrics', style: { color: '#fc4d04' } },
  //   series: [
  //     {
  //       type: 'line',
  //       color: '#fc4d04',
  //       data: [5, 9, 7, 14, 10, 17, 22, 18, 16, 20, 24, 28]
  //     }
  //   ],
  //   credits: { enabled: false }
  // };

  colDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', width: 90 },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Status', field: 'status' }
  ];

  rowData = [
    { id: 1, name: 'Alpha', status: 'Active' },
    { id: 2, name: 'Beta', status: 'Pending' },
    { id: 3, name: 'Gamma', status: 'Active' }
  ];

}
