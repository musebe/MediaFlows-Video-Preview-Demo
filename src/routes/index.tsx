import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useEffect } from "react"
import { HeroVideoBackground } from "@/components/hero/HeroVideoBackground"
import { getHeroPreview } from "@/server/get-hero-preview"

export const Route = createFileRoute("/")({
  loader: async () => {
    const hero = await getHeroPreview()
    return { hero }
  },
  component: HomePage,
})

function HomePage() {
  const { hero } = Route.useLoaderData()
  const router = useRouter()

  useEffect(() => {
    const handler = () => {
      router.invalidate()
    }

    window.addEventListener("mediaflows:asset-ready", handler)

    return () => {
      window.removeEventListener("mediaflows:asset-ready", handler)
    }
  }, [router])

  return (
    <main className="bg-background text-foreground">
      <HeroVideoBackground
        asset={hero.asset}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        subheading={hero.subheading}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">
            Upload a video and watch it update
          </h2>
          <p className="leading-7 text-muted-foreground">
            The navbar upload button sends a video to Cloudinary, MediaFlows
            creates a preview, and the hero updates when the webhook finishes
            processing.
          </p>
        </div>
      </section>
    </main>
  )
}
