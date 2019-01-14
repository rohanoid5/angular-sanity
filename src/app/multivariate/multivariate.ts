import { Component } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'multivariate',
  templateUrl: './multivariate.html'
})
export class MultiVariate {
  dataSource: any;
  type: string;
  width: string;
  height: string;
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
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-two-variable-measures-data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-two-variable-measures-schema.json'
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
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
    });
  }
}
