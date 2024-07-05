export function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="mx-auto mb-20 mt-5 w-full max-w-[96%]">{children}</main>
  )
}
