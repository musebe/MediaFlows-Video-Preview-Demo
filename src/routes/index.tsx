import { createFileRoute } from "@tanstack/react-router"
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

  return (
    <main className="bg-background text-foreground">
      <HeroVideoBackground
        asset={hero.asset}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        subheading={hero.subheading}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">
            Server function video config
          </h2>
          <p className="leading-7 text-muted-foreground">
            The home route now loads typed hero data through a TanStack Start
            server function. This is cleaner than a hardcoded localhost fetch
            and easier to swap with MediaFlows data next.
          </p>
        </div>
      </section>
    </main>
  )
}
