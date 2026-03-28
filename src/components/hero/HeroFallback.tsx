type HeroFallbackProps = {
  posterImageUrl: string
  title: string
}

export function HeroFallback({ posterImageUrl, title }: HeroFallbackProps) {
  return (
    <div className="absolute inset-0">
      <img
        src={posterImageUrl}
        alt={title}
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
