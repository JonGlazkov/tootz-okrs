'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { OKRs } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getOKRs } from './actions'
import { OKRCard } from './components/okrs-card'

export default function Home() {
  const { data: okrs, isLoading } = useQuery<OKRs[]>({
    queryKey: ['okrs'],
    queryFn: () => getOKRs(),
  })

  return (
    <>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[40rem]" />
        ))
      ) : (
        <>{okrs?.map((okr) => <OKRCard key={okr.id} okr={okr} />)}</>
      )}
    </>
  )
}
