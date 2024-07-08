export function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="mx-auto mb-20 mt-5 flex w-[90%] max-w-6xl flex-col">
      {children}
    </main>
  )
}
