import * as echarts from 'echarts';
class Chart {
  constructor(dom, { title = {}, series = [], xAxis = {} } = {}) {
    this.myChart = echarts.init(dom);
    this.title = title
    this.xAxis = xAxis
    this.series = series
    this.init()
  }
  // 基于准备好的dom，初始化echarts实例
  init() {
    // 绘制图表
    this.myChart.setOption({
      title: this.title,
      tooltip: {},
      xAxis: this.xAxis,
      yAxis: {},
      series: this.series
    });
  }
}
export default function (dom, option) {
  return new Chart(dom, option)
}