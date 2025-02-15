import { KeyObjective, ResultKeys } from '@/types'

export const calculateProgress = (deliveries: KeyObjective[]) => {
  if (deliveries.length === 0) return 0
  const totalProgress = deliveries.reduce(
    (acc, delivery) => acc + delivery.progress,
    0,
  )
  return Math.round(totalProgress / deliveries.length)
}

export const calculateUniqueProgress = (deliveries: KeyObjective) => {
  return Math.round(deliveries.progress)
}

export const calculateOverallProgress = (resultKeys: ResultKeys[]) => {
  if (resultKeys.length === 0) return 0
  const totalProgress = resultKeys.reduce((acc, rk) => {
    const progress = calculateProgress(rk.deliveries)
    return acc + progress
  }, 0)
  return Math.round(totalProgress / resultKeys.length)
}
