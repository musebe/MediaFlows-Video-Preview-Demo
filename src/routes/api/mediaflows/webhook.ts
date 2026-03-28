import { createFileRoute } from "@tanstack/react-router"
import type { MediaFlowsPreviewAsset } from "@/lib/mediaflows/types"
import { setLatestMediaFlowsAsset } from "@/lib/mediaflows/store"

type WebhookBody = {
  source: string
  event: string
  asset: {
    publicId: string
    title: string
    posterPublicId?: string
    preview: {
      startOffset: number
      duration: number
      aspectRatio?: string
    }
  }
  previewUrl?: string
  fullVideoUrl?: string
}

export const Route = createFileRoute("/api/mediaflows/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as WebhookBody

        console.log("[webhook] raw body:", body)

        const asset: MediaFlowsPreviewAsset = {
          publicId: body.asset.publicId,
          title: body.asset.title,
          posterPublicId: body.asset.posterPublicId,
          resourceType: "video",
          secureUrl: body.fullVideoUrl,
          previewUrl: body.previewUrl,
          preview: {
            startOffset: body.asset.preview.startOffset,
            duration: body.asset.preview.duration,
            aspectRatio: body.asset.preview.aspectRatio || "16:9",
          },
        }

        console.log("[webhook] mapped asset:", asset)

        setLatestMediaFlowsAsset(asset)

        return Response.json({
          ok: true,
          received: true,
          saved: true,
          publicId: asset.publicId,
        })
      },
    },
  },
})