import { NotebookIcon } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { CreateOKR } from './create-okr'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <NotebookIcon className="h-6 w-6 text-primary" />

        <Separator orientation="vertical" className="h-6" />

        <h2 className="flex text-muted-foreground text-sm sm:text-lg items-center space-x-4 lg:space-x-6">
          Lista de OKRs
        </h2>

        <div className="ml-auto flex items-center gap-2">
          <CreateOKR />
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
