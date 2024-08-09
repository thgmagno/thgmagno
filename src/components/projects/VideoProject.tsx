interface Props {
  videoUrl: string
}

export function VideoProject({ videoUrl }: Props) {
  return (
    <div className="relative mx-auto my-8 h-[400px] w-full opacity-90 sm:max-w-[90%] md:max-w-[60%]">
      <iframe
        width="100%"
        height="100%"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  )
}
