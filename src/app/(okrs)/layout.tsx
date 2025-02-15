import { Header } from '@/components/header'

export default function OKRsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="w-screen h-full grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 py-8 px-6 sm:py-12 md:px-20 ">
        {children}
      </div>
    </div>
  )
}
