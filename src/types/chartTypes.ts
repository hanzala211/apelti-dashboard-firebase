import { ApexOptions } from 'apexcharts';

export interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}
