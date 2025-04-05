import clsx from 'clsx'
import React from 'react'

interface Props extends React.HTMLProps<HTMLParagraphElement> {
  message: string | string[] | undefined
}

export function ErrorMessage({ message, className, ...rest }: Props) {
  if (!message) return null
  const formattedMessage =
    typeof message === 'string' ? message : message.join('. ')
  return (
    <p
      title={formattedMessage}
      className={clsx('truncate text-xs text-red-400 md:text-sm', className)}
      {...rest}
    >
      {formattedMessage}
    </p>
  )
}
