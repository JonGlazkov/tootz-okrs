'use client'
import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

import { createOKR } from '@/app/(okrs)/actions'
import { queryClient } from '@/hooks/client'
import { useIsMobile } from '@/hooks/use-mobile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const createOKRSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome do seu objetivo deve ter pelo menos 3 caracteres',
  }),
})

type CreateOKRForm = z.infer<typeof createOKRSchema>

export function CreateOKR() {
  const isMobile = useIsMobile()
  const form = useForm<CreateOKRForm>({
    resolver: zodResolver(createOKRSchema),
    defaultValues: {
      name: '',
    },
  })

  const { mutateAsync: create } = useMutation({
    mutationKey: ['createOKR'],
    mutationFn: createOKR,
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['okrs'] })
      toast.success('OKR criado com sucesso')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = form.handleSubmit(async (data: CreateOKRForm) => {
    try {
      await create(data)
    } catch (error) {
      toast.error('Erro ao criar OKR')
    }
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="flex items center gap-2">
          <PlusIcon className="w-5 h-5" />
          Criar Objetivo
        </Button>
      </SheetTrigger>
      <Form {...form}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className="flex flex-col h-[400px] sm:h-auto"
        >
          <SheetHeader className="my-4">
            <SheetTitle>Qual o objetivo que você deseja criar?</SheetTitle>
          </SheetHeader>

          <form className="space-y-2" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Objetivo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do seu objetivo"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button disabled={form.formState.isSubmitting} type="submit">
                Criar
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Form>
    </Sheet>
  )
}
