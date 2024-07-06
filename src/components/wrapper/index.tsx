export function Wrapper({
  children,
  title,
}: Readonly<{
  children: React.ReactNode
  title?: string
}>) {
  return (
    <main className="mx-auto mb-20 mt-5 flex w-[90%] max-w-6xl flex-col">
      {title && <h1 className="text-xl font-medium">{title}</h1>}
      {children}
    </main>
  )
}
