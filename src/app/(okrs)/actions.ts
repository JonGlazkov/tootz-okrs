import ApiService from '@/services'
import { OKRPayload, OKRs, ResultKeys, ResultKeysPayload } from '@/types'

const apiService = new ApiService(
  'https://67ae39339e85da2f020cdcc7.mockapi.io/api/okrs',
)

export async function getOKRs() {
  return await apiService.get<OKRs[]>('/')
}

export async function createOKR(okr: OKRPayload) {
  return await apiService.post<OKRs, OKRPayload>('/', okr)
}

export async function deleteOKR(okrId: string) {
  return await apiService.delete<OKRs>(`/${okrId}`)
}

export async function getResultKeys(okrId: string) {
  return await apiService.get<ResultKeys[]>(`/${okrId}/resultKeys`)
}

export async function updateResultKey(resultKey: ResultKeys) {
  return await apiService.put<ResultKeys, ResultKeys>(
    `/${resultKey.okrId}/resultKeys/${resultKey.id}`,
    resultKey,
  )
}

export async function getResultKeyByOkrId(okrId: string) {
  return await apiService.get<ResultKeys[]>(`/${okrId}/resultKeys`)
}

export async function createResultKey(
  okrId: string,
  resultKey: ResultKeysPayload,
) {
  return await apiService.post<ResultKeys[], ResultKeysPayload>(
    `/${okrId}/resultKeys`,
    resultKey,
  )
}

export async function deleteResultKeys(okrId: string) {
  return await apiService.delete<ResultKeys>(`/${okrId}/resultKeys`)
}
