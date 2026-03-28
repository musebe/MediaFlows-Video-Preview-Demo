import { useEffect, useMemo, useState } from "react"
import type { HeroVideoAsset } from "@/lib/video/types"
import { buildHeroVideoUrls } from "@/lib/cloudinary/urls"
import { HeroFallback } from "./HeroFallback"

type HeroVideoBackgroundProps = {
  asset: HeroVideoAsset
  eyebrow?: string
  heading: string
  subheading: string
}

export function HeroVideoBackground({
  asset,
  eyebrow = "Smart video previews",
  heading,
  subheading,
}: HeroVideoBackgroundProps) {
  const urls = useMemo(() => buildHeroVideoUrls(asset), [asset])
  const [showFullVideo, setShowFullVideo] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowFullVideo(true)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[60vh] sm:min-h-[72vh] lg:min-h-[84vh]">
        <HeroFallback
          posterImageUrl={urls.posterImageUrl}
          title={asset.title}
        />

        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={urls.posterImageUrl}
          aria-label={asset.title}
        >
          {urls.previewSources.map((source) => (
            <source
              key={`${source.width}-${source.media || "default"}`}
              src={source.src}
              media={source.media}
              type="video/mp4"
            />
          ))}
        </video>

        {showFullVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={urls.posterImageUrl}
            aria-hidden="true"
          >
            <source src={urls.fullVideoUrl} type="video/mp4" />
          </video>
        ) : null}

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-6xl items-end px-4 py-12 sm:min-h-[72vh] sm:px-6 sm:py-16 lg:min-h-[84vh]">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-xs font-medium tracking-[0.25em] text-white/80 uppercase sm:text-sm">
              {eyebrow}
            </p>

            <h1 className="text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
              {heading}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
              {subheading}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
