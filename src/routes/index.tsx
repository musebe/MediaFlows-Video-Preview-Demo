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
        <div className="max-w-4xl space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              What this demo achieves
            </h2>
            <p className="leading-7 text-muted-foreground">
              This demo shows how Cloudinary MediaFlows PowerFlows can automate
              a complete video preview workflow from upload to delivery.
              PowerFlows is Cloudinary’s low-code, drag-and-drop workflow
              builder for media pipelines, designed to connect upload events,
              transformations, and external systems in one flow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">PowerFlow automation</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                In this project, a PowerFlow starts on asset upload, filters for
                video assets, generates a short optimized preview URL, and sends
                the result to the TanStack Start app through a webhook. This
                removes manual media steps and turns a normal upload into an
                automated preview pipeline.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">Smart preview delivery</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The flow creates an 8 second hero-ready clip using Cloudinary
                video transformations with start offset, duration, resizing, and
                automatic optimization. The app then uses that preview URL for
                the hero while keeping the full video available as the richer
                source.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">Frontend upload testing</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The navbar includes the Cloudinary Upload Widget, so users can
                upload their own video without opening the backend or the
                Cloudinary console. After upload, the app waits for MediaFlows
                to finish processing, then updates the hero with the latest
                saved asset.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">
                Webhook-driven app updates
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The TanStack Start app receives webhook data from MediaFlows,
                maps the asset into UI state, and renders the newest preview
                video in the hero. This shows how MediaFlows can sit between
                media upload and product UI delivery with very little glue code.
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-neutral-50 p-5">
            <h3 className="text-lg font-semibold">Flow summary</h3>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
              <li>
                1. A user uploads a video from the app with the Upload Widget.
              </li>
              <li>2. Cloudinary stores the original uploaded asset.</li>
              <li>
                3. MediaFlows PowerFlows triggers automatically on video upload.
              </li>
              <li>4. The flow builds a trimmed, optimized preview URL.</li>
              <li>5. The flow sends that payload to the app webhook.</li>
              <li>6. The app saves the latest asset and updates the hero.</li>
            </ol>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Project links</h3>
            <div className="mt-4 space-y-3 text-sm">
              <p>
                <span className="font-medium text-foreground">Live demo:</span>{" "}
                <a
                  href="https://media-flows-video-preview-demo.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline underline-offset-4"
                >
                  media-flows-video-preview-demo.vercel.app
                </a>
              </p>
              <p>
                <span className="font-medium text-foreground">
                  GitHub repo:
                </span>{" "}
                <a
                  href="https://github.com/musebe/MediaFlows-Video-Preview-Demo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline underline-offset-4"
                >
                  github.com/musebe/MediaFlows-Video-Preview-Demo
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
