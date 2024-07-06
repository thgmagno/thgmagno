export function Wrapper({
  children,
  title,
}: Readonly<{
  children: React.ReactNode
  title?: string
}>) {
  return (
    <main className="mx-auto mb-20 mt-5 w-full max-w-[96%]">
      {title && <h1 className="text-xl font-medium">{title}</h1>}
      {children}
    </main>
  )
}
