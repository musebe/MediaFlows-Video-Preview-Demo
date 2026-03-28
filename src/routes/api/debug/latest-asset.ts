import { createFileRoute } from "@tanstack/react-router"
import { getLatestMediaFlowsAsset } from "@/lib/mediaflows/store"

export const Route = createFileRoute("/api/debug/latest-asset")({
  server: {
    handlers: {
      GET: async () => {
        const asset = getLatestMediaFlowsAsset()

        return Response.json({
          ok: true,
          asset,
        })
      },
    },
  },
})