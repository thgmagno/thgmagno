import Image from 'next/image'

export function ImageProject({ url, title }: { url: string; title: string }) {
  return (
    <div className="relative min-h-32 w-full">
      <Image
        src={url}
        fill
        alt={`Image of ${title}`}
        className="absolute left-0 top-0 object-cover opacity-80"
      />
    </div>
  )
}
