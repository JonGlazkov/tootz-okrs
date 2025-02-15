'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { OKRs, ResultKeys } from '@/types'
import { useQuery } from '@tanstack/react-query'
import {
  calculateOverallProgress,
  calculateProgress,
  calculateUniqueProgress,
} from '../../../utils/calculateProgress'
import { getResultKeys } from '../actions'
import { AddResultKeyDialog } from './add-result-key-dialog'
import { EditResultKeyDialog } from './edit-result-key-dialog'

interface OKRCardProps {
  okr: OKRs
}

export function OKRCard({ okr }: OKRCardProps) {
  const { data: resultKeys } = useQuery<ResultKeys[]>({
    queryKey: ['resultKeys', okr.id],
    queryFn: () => getResultKeys(okr.id),
  })

  // const { mutateAsync: deleteResultKeysFn } = useMutation({
  //   mutationKey: ['deleteResultKeys', okr.id],
  //   mutationFn: deleteResultKeys,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['resultKeys'] })
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  // })

  // const { mutateAsync: deleteOKRFn } = useMutation({
  //   mutationKey: ['deleteOKR', okr.id],
  //   mutationFn: deleteOKR,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['okrs'] })
  //     toast.success('OKR deletado com sucesso')
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  // })

  const overallProgress = calculateOverallProgress(resultKeys ?? [])

  return (
    <Card className="flex flex-col lg:min-h-[40rem] w-full bg-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-3 w-full">
            <CardTitle>{okr.name}</CardTitle>
            <Progress value={overallProgress} className="h-2 w-full" />
            <div className="text-md text-muted-foreground">
              {overallProgress}%
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="w-full h-full mb-auto">
        <div className="text-sm flex gap-2 justify-center items-center w-full text-secondary-foreground font-medium mx-auto">
          <Separator className="my-2 mx-auto w-[34%]" />
          Resultados-Chave
          <Separator className="my-2 mx-auto w-[34%]" />
        </div>

        <div className="my-3 space-y-8">
          {resultKeys &&
            resultKeys?.map((rk) => {
              const progress = calculateProgress(rk.deliveries)
              return (
                <div key={rk.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-foreground font-medium">{rk.name}</div>
                    <div className="flex gap-2">
                      <EditResultKeyDialog resultKey={rk} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="h-2" />
                    <span className="text-sm text-muted-foreground min-w-[40px]">
                      {progress}%
                    </span>
                  </div>

                  {rk.deliveries.map((delivery) => {
                    const progress = calculateUniqueProgress(delivery)
                    return (
                      <div
                        key={delivery.name}
                        className="flex  items-center justify-between"
                      >
                        <li className=" text-muted-foreground">
                          {delivery.name}
                        </li>

                        <span className="text-sm text-muted-foreground min-w-[40px]">
                          {progress}%
                        </span>
                      </div>
                    )
                  })}
                  <Separator className="space-y-5 mx-auto w-full" />
                </div>
              )
            })}
        </div>
      </CardContent>
      <CardFooter>
        {/* <AlertDeleteDialog
          isLoading={isPending}
          onDelete={deleteOKRandResultKeys}
        /> */}
        <AddResultKeyDialog okrId={okr.id} />
      </CardFooter>
    </Card>
  )
}
