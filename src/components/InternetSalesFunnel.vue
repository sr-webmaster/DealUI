<template>
  <div
    ref="chartdiv"
    class="chartdiv"
  />
</template>
<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import reduce from 'lodash/reduce'
am4core.useTheme(am4themesAnimated)

export default {
  props: {
    chartData: {
      type: Object,
      required: true
    },
    numberFormat: {
      type: String,
      default: null
    }
  },
  mounted () {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.SlicedChart)
    if (this.numberFormat) {
      chart.numberFormatter.numberFormat = this.numberFormat
    }
    chart.legend = new am4charts.Legend()
    // Group Closed values
    let closed = { label: 'CLOSED', value: 0 }
    chart.data = reduce(this.chartData.data, (result, item, key) => {
      // let headerObject = parameters.find(item => item.name === value)
      if (item.label.includes('CLOSED')) {
        closed.value += item.value
      } else {
        result.push(item)
      }
      return result
    }, [])
    if (closed.value !== 0) {
      chart.data.push(closed)
    }
    // sort chart values
    chart.data.sort(function (a, b) {
      return b.value - a.value
    })
    chart.legend.position = 'right'
    chart.legend.valign = 'middle'
    let series = chart.series.push(new am4charts.FunnelSeries())
    series.dataFields.value = 'value'
    series.dataFields.category = 'label'
    series.labels.template.disabled = true
    series.colors.list = [
      am4core.color('#9dbd81'),
      am4core.color('#dcb877'),
      am4core.color('#c47c7c'),
      am4core.color('#aa99be'),
      am4core.color('#7e99da'),
      am4core.color('#d64400')
    ]
  }
}
</script>

<style scoped>
.chartdiv{
  height: 480px;
}
</style>
