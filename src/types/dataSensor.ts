export interface DataSensor {
  sensorId: string
  valores: {
    x: string  // fecha/hora como string
    y: number
  }[]
}
