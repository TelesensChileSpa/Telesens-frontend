import WidgetLine from './WidgetLine.vue'
import WidgetGauge from './WidgetGauge.vue'
import WidgetCard from './WidgetCard.vue'

export const widgetComponents: Record<string, any> = {
  linea: WidgetLine,
  gauge: WidgetGauge,
  tarjeta: WidgetCard
}
