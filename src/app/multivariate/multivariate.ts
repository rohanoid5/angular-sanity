import { Component } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

let schema = [
  {
    name: 'Country',
    type: 'string'
  },
  {
    name: 'Time',
    type: 'date',
    format: '%-m/%-d/%Y'
  },
  {
    name: 'Sales',
    type: 'number'
  },
  {
    name: 'Quantity',
    type: 'number'
  },
  {
    name: 'Shipping Cost',
    type: 'number'
  }
];

@Component({
  selector: 'multivariate',
  templateUrl: './multivariate.html'
})
export class MultiVariate {
  dataSource: any;
  type: string;
  width: string;
  height: string;
  showChart = false;
  constructor() {
    console.log('timeseries called');
    this.type = 'timeseries';
    this.width = '600';
    this.height = '400';
    this.dataSource = {
      data: null,
      yAxis: null,
      caption: null
    };
    this.fetchData();
  }

  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-multi-variate/data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/schema.json'
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      this.dataSource.data = fusionTable;
      this.dataSource.yAxis = {
        plot: [
          {
            value: 'Sales ($)'
          }
        ]
      };
      this.dataSource.caption = {
        text: 'Online Sales of a SuperStore in the US'
      };
      this.showChart = true;
    });
  }
}
