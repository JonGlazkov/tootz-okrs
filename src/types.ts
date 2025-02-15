export type KeyObjective = {
  name: string
  progress: number
}

export type ResultKeys = {
  id: string
  okrId: string
  createdAt: Date
  name: string
  deliveries: KeyObjective[]
}

export type OKRs = {
  id: string
  createdAt: Date
  name: string
  resultKeys: ResultKeys[]
}

export type OKRPayload = {
  name: string
}

export type ResultKeysPayload = {
  name: string
  deliveries: KeyObjective[]
}
