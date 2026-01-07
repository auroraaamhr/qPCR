export const generateAmplificationCurve = (baselineValue, threshold, cycleThreshold, maxValue, noise = 0.02) => {
  const data = []

  for (let cycle = 1; cycle <= 45; cycle++) {
    let value

    if (cycle < cycleThreshold - 5) {
      value = baselineValue + (Math.random() * noise - noise / 2)
    } else if (cycle >= cycleThreshold - 5 && cycle <= cycleThreshold + 10) {
      const distanceFromCt = cycle - cycleThreshold
      const sigmoidValue = 1 / (1 + Math.exp(-distanceFromCt))
      value = baselineValue + (maxValue - baselineValue) * sigmoidValue
      value += (Math.random() * noise - noise / 2) * value
    } else {
      value = maxValue * (0.95 + Math.random() * 0.1)
    }

    data.push({
      cycle,
      value: Number(value.toFixed(3)),
      threshold,
    })
  }

  return data
}
