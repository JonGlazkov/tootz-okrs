'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { queryClient } from '@/hooks/client'
import { ResultKeys } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Pencil, PlusIcon, TrashIcon } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateResultKey } from '../actions'

interface EditResultKeyDialogProps {
  resultKey: ResultKeys
}

const editResultKeySchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  deliveries: z.array(
    z.object({
      deliveryName: z.string().nonempty('Nome é obrigatório'),
      progress: z.coerce.number().int().min(0).max(100),
    }),
  ),
})

export type EditResultKeyFormValues = z.infer<typeof editResultKeySchema>

export function EditResultKeyDialog({ resultKey }: EditResultKeyDialogProps) {
  const form = useForm<EditResultKeyFormValues>({
    resolver: zodResolver(editResultKeySchema),
    defaultValues: {
      name: resultKey.name,
      deliveries: resultKey.deliveries.map((delivery) => ({
        deliveryName: delivery.name,
        progress: delivery.progress,
      })),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'deliveries',
  })

  const updateResultKeyMutation = useMutation({
    mutationFn: updateResultKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resultKeys'] })
      toast.success('Atualizações salvas com sucesso')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = form.handleSubmit(async (data: EditResultKeyFormValues) => {
    updateResultKeyMutation.mutate({
      ...resultKey,
      name: data.name,
      deliveries: data.deliveries.map((delivery) => ({
        name: delivery.deliveryName,
        progress: delivery.progress,
      })),
    })
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] md:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Editar Resultados Chaves</DialogTitle>
          <DialogDescription>
            Faça a edição do nome do Resultado Chave, Objetivos e do seu
            progresso atual.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-3 my-2">
                  <FormLabel className="text-md font-medium">
                    Nome do Resultado Chave
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do Resultado Chave" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="w-full bg-primary" />

            <div className="flex flex-col gap-4 text-md text-muted-foreground font-medium">
              Entregas
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-7 gap-2 last:mb-8"
                >
                  <FormField
                    name={`deliveries.${index}.deliveryName`}
                    control={form.control}
                    defaultValue={field.deliveryName}
                    render={({ field }) => (
                      <FormItem className="col-span-5 relative">
                        <FormControl>
                          <Input placeholder="Nome da entrega" {...field} />
                        </FormControl>
                        <FormMessage className="absolute" />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-2 flex flex-row gap-2 items-center">
                    <FormField
                      name={`deliveries.${index}.progress`}
                      control={form.control}
                      defaultValue={field.progress}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                type="number"
                                placeholder="Progresso"
                                {...field}
                                className="w-full"
                              />
                              <span className="ml-2">%</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant="ghost"
                      onClick={() => remove(index)}
                      className="p-0"
                      title="Remover entrega"
                    >
                      <TrashIcon className="w-5 h-6 text-rose-500 hover:text-rose-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                onClick={() => append({ deliveryName: '', progress: 0 })}
              >
                <PlusIcon className="h-4 w-4" />
                Adicionar entrega
              </Button>
              <DialogClose asChild>
                <Button type="submit">Salvar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
